module.exports = function(server) {

  var io = require('socket.io')(server);

  var videoSocket = io.of('/video');

  videoSocket.on('connection', function(socket){ 

    console.log("VIDEO SOCKET CONNECTED");

    socket.on('send candidate', function(candidate){
      videoSocket.emit('message', candidate);
    });

    socket.on('send offer', function(stream){
      videoSocket.emit('message', stream);
    });

    socket.on('disconnect call', function(callInfo) {
      console.log('A user disconnected.');
      videoSocket.emit('disconnect call', callInfo);
    });

    socket.on('disconnect', function() {
      console.log('A user disconnected.');
    });

  });

  var editorSocket = io.of('/editor');

  editorSocket.on('connection', function(socket){

    console.log("EDITOR SOCKET CONNECTED");

    socket.on('change', function(msg) {
      console.log('text:' + msg)
      editorSocket.emit('change', msg);
    });  

    socket.on('disconnect', function() {
      console.log('A user disconnected.');
    });

  });

};