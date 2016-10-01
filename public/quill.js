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
  // grab docId from URL ?
  sharelinkId = docId;

  // need to stop interval and restart
  // passing in new sharelinkId

  console.log(docId);
  $.post('/document', {
    sharelink: docId
  });
  quill.setContents();

  console.log('loc:', window.location.indexOf('sharelink'));
  if (window.location.indexOf('sharelink') ) {
    window.location += '?sharelink=' + sharelinkId;
  }
});
  // generates new link id; ensure id is not used
  // set sharelinkId
  // creates an empty doc in the db with that link id
  // later need to link to user(s)

  // set contents to empty since new doc
  // do not need to initialize editor with text from the empty doc


// initialize with content from a given sharelink
var initDoc = function(sharelink) {
  $.get('/document?sharelink=' + sharelink, function(data) {
    console.log(window.location.href);
    console.log('get:', data.textS3);
    quill.setContents( JSON.parse(data.textS3) );
  });
};

initDoc(sharelinkId);

var saveInterval = setInterval(function() {
  if (change.length() > 0) {
    console.log('Saving changes', change);

    $.ajax({
      url: '/document',
      type: 'PUT',
      data: 'sharelink=' + sharelinkId + '&textS3=' + JSON.stringify(quill.getContents()),
      success: function(result) {
        console.log('PUT request:', result);
      }
    });

    change = new Delta();
  } 
}, 5000);
