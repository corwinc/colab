require('dotenv').config();

const path = require('path');

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var documentRouter = require('./resources/routers/documentRouter');
var usersRouter = require('./resources/routers/usersRouter');
var commentsRouter = require('./resources/routers/commentsRouter');
var userDocumentRouter = require('./resources/routers/userDocumentRouter');
var db = require('../db/config.js');

require('./config/passport.js');

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use('/public', express.static(path.join(__dirname, '/../public')));

const rootPath = path.join(__dirname + '/../');

var server = require('http').Server(app);
require('./sockets/socketRouter')(server);

app.use('/document', documentRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/userdocs', userDocumentRouter);

app.use('/auth', usersRouter);
app.use('/auth', usersRouter);

app.get('/*', (req, res) => {
 res.sendFile(rootPath + 'public/index.html');
})


var port = process.env.PORT || 8000;
server.listen(port);
console.log('Server running on port ' + port);