var user = 'user_' + Date.now(); // temp unique user identifier; swap out later with username
console.log(user + ' logged on.');

var $editor = $('#editor');

var socket = io();

var quill = new Quill('#editor', {
  theme: 'snow'
});

quill.on('text-change', function(delta, olddelta, source) {
  console.log('source:', source);
  console.log('user text change detected:', user);
  if (source === 'user') {
    console.log('delta:', delta);
    console.log('source:', source);
    console.log('emit change event user:', user);
    socket.emit('change', {'who': user, 'delta': JSON.stringify(delta)});
  }
});

socket.on('change', function(msg){
  console.log('on change event');
  console.log('msg.who:', msg.who);
  console.log('user:', user);
  console.log(msg.who === user);
  console.log('msg:', msg)
  console.log('receive change event:', msg.who);
  if(msg.who !== user) { // prevent infinite loop; user who emitted msg should not receive it
    console.log('msg.who:', msg.who);
    console.log('user:', user);
    console.log(msg.who === user);

    var del = JSON.parse(msg.delta);
    // var Delta = fullEditor.getContents().constructor;
    // var delta = new Delta(del.startLength,del.endLength,del.ops);
    // quill.updateContents( del, String = 'user' );
    quill.updateContents( del );
  }
});
