var Delta = Quill.import('delta');
var user = 'user_' + Date.now(); // temp unique user identifier; swap out later with username
var urldocId = window.location.search.split('').splice(11).join('');

var docId = 'doc' + Date.now(); 
var sharelinkId = urldocId.length === 0 ? 'hr46' : urldocId; // default to public doc if there is no doc id in url

console.log(user + ' logged on.');

var $editor = $('#editor');

var socket = io('/editor');

var quill = new Quill('#editor', {
  theme: 'snow'
});

var change = new Delta();
quill.on('text-change', function(delta, olddelta, source) {
  if (source === 'user') {
    change = change.compose(delta); // for saving partial changes
    socket.emit('change', {'sharelinkId': sharelinkId, 'who': user, 'delta': JSON.stringify(delta)});
  }
});

socket.on('change', function(msg){
  if(msg.who !== user && sharelinkId === msg.sharelinkId) { // prevent infinite loop; user who emitted msg should not receive it
    var del = JSON.parse(msg.delta);
    quill.updateContents( del );
  }
});

// new document button onclick
$('#newdoc').on('click', function() {
  // grab docId from URL?
  sharelinkId = docId;

  console.log('newdoc');

  // need to stop interval and restart
  clearInterval(saveInterval);

  // need to refactor
  var saveInterval = setInterval(function() {
    if (change.length() > 0) {
      console.log('Saving changes', sharelinkId);
      
      // commented out to limit AWS RDS db hits
      $.ajax({
        url: '/document',
        type: 'PUT',
        data: 'sharelink=' + sharelinkId + '&textS3=' + JSON.stringify(quill.getContents()),
        success: function(result) {
          console.log('Data saved.');
        }
      });

      change = new Delta();
    } 
  }, 5000);

  // ensure new sharelink is being used to save data

  $.post('/document', {
    sharelink: docId
  });
  quill.setContents();

  // if (window.location.indexOf('sharelink') ) {
    // window.location += '?sharelink=' + sharelinkId;
    var emaillink = window.location.hostname + ':' + window.location.port + '?sharelink=' + sharelinkId;
    console.log('link to pass', emaillink);
  // }
});

// initialize with content from a given sharelink
var initDoc = function(sharelink) {
  $.get('/document?sharelink=' + sharelink, function(data) {
    quill.setContents( JSON.parse(data.textS3) );
  });
};

initDoc(sharelinkId);

var saveInterval = setInterval(function() {
  if (change.length() > 0) {
    console.log('Saving changes', sharelinkId);

    // commented out to limit AWS RDS db hits
    $.ajax({
      url: '/document',
      type: 'PUT',
      data: 'sharelink=' + sharelinkId + '&textS3=' + JSON.stringify(quill.getContents()),
      success: function(result) {
        console.log('Data saved.');
      }
    });

    change = new Delta();
  } 
}, 5000);
