var Delta = Quill.import('delta');
var user = 'user_' + Date.now(); // temp unique user identifier; swap out later with username
var docId = 'doc' + Date.now(); 

console.log(user + ' logged on.');

var $editor = $('#editor');

var socket = io();

var quill = new Quill('#editor', {
  theme: 'snow'
});

var change = new Delta();
quill.on('text-change', function(delta, olddelta, source) {
  if (source === 'user') {
    change = change.compose(delta); // for saving partial changes
    socket.emit('change', {'who': user, 'delta': JSON.stringify(delta)});
  }
});

socket.on('change', function(msg){
  if(msg.who !== user) { // prevent infinite loop; user who emitted msg should not receive it
    var del = JSON.parse(msg.delta);
    quill.updateContents( del );
  }
});
// set sharelink; public share link id
var sharelinkId = '5abc';

// new document button onclick
$('#newdoc').on('click', function() {
  // grab docId from URL?
  sharelinkId = docId;

  // need to stop interval and restart
  // ensure new sharelink is being used to save data
  $.post('/document', {
    sharelink: docId
  });
  quill.setContents();

  // if (window.location.indexOf('sharelink') ) {
  //   window.location += '?sharelink=' + sharelinkId;
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
    console.log('Saving changes');

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
