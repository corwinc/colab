require('dotenv').config();

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var documentRouter = require('./resources/routers/documentRouter');
var usersRouter = require('./resources/routers/usersRouter');
var commentsRouter = require('./resources/routers/commentsRouter');
var db = require('../db/config.js');

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client'));

app.get('/', function(req, res) {
  res.sendFile('index');
});

/* VB EDIT FOR VIDEO CALLING: Add socket listeners/emitters */

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
  
});

/* END VIDEO CALLING EDITS */



app.use('/document', documentRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

var port = process.env.PORT || 8000;
server.listen(port);
console.log('Server running on port ' + port);