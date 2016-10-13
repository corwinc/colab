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

    socket.on('signal conference call', function(userInfo){
      videoSocket.emit('initialize conference call', userInfo);
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



  var documents = {};

  var documentSocket = io.of('/document');

  documentSocket.on('connection', function(socket){

    console.log("DOCUMENT SOCKET CONNECTED");

    socket.on('user joining document', function(joinInfo){
      var joinInfo = JSON.parse(joinInfo);
      if (documents[joinInfo.documentId] === undefined) {
        documents[joinInfo.documentId] = [];
      }
      documents[joinInfo.documentId].push(joinInfo.newUserId);
      console.log("user joining document *************************");
      setTimeout(function(){
        documentSocket.emit('user joins document', JSON.stringify({"documentId": joinInfo.documentId, "activeUsers": documents[joinInfo.documentId]}));
      }, 100);
    });

    socket.on('user leaving document', function(exitInfo){
      var exitInfo = JSON.parse(exitInfo);
      console.log("user exiting document *************************, before ", documents);
      var exUserIndex = documents[exitInfo.documentId].indexOf(exitInfo.exitingUserId);
      documents[exitInfo.documentId].splice(exUserIndex, exUserIndex + 1);
      documentSocket.emit('user leaves document', JSON.stringify({"documentId": exitInfo.documentId, "activeUsers": documents[exitInfo.documentId]}));
      console.log("********* AFTER: ", documents);
    });

    socket.on('disconnect', function() {
      console.log('A user disconnected.');
    });

  });

};