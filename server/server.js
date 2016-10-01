// Comment this out for the deployment branch. Enviroment variables
// are brough in using AWS config settings. 
// require('dotenv').config();
require('dotenv').config();
const path = require('path');
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var documentRouter = require('./resources/routers/documentRouter');
var usersRouter = require('./resources/routers/usersRouter');
var commentsRouter = require('./resources/routers/commentsRouter');
var db = require('../db/config.js');

/* VB EDIT FOR VIDEO CALLING: Add socket module, use an http server to host socket. 
   Note that this means the app.listen(port) becomes server.listen(port) to start 
   the server. This does not conflict with the RESTful API handling its requests. */

var server = require('http').Server(app);
var io = require('socket.io')(server);

/* END VIDEO CALL EDITS #1 */

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../client'));

const rootPath = path.join(__dirname + '/../')

/* VB EDIT FOR VIDEO CALLING #2: Add socket listeners/emitters 
   Added socket for text editor
*/

io.on('connection', function(socket){ 

  console.log("SOCKET CONNECTED");

  socket.on('send candidate', function(candidate){
    io.emit('message', candidate);
  });

  socket.on('send offer', function(stream){
    io.emit('message', stream);
  });

  socket.on('disconnect call', function() {
    console.log('A user disconnected.');
    io.emit('disconnect call');
  });

  socket.on('disconnect', function() {
    console.log('A user disconnected.');
  });

  socket.on('change', function(msg) {
    console.log('text:' + msg)
    io.emit('change', msg);
  });
  
});

/* END VIDEO CALLING EDITS #2 */

app.use('/document', documentRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

app.get('/*', (req, res) => {
 res.sendFile(rootPath + 'client/index.html');
})


var port = process.env.PORT || 8000;
server.listen(port);
console.log('Server running on port ' + port);