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
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client'));

const rootPath = path.join(__dirname + '/../')

// app.get('/', function(req, res) {
//   res.sendFile('index');
// });

app.get('/*', (req, res) => {
	res.sendFile(rootPath + 'client/index.html');
})

app.use('/document', documentRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Server running on port ' + port);