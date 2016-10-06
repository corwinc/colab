var Sequelize = require('sequelize');
var sqlConnection  = require('../config.js');

var Comment = sqlConnection.define('comment', 
  { text: Sequelize.STRING, 
    block: Sequelize.INTEGER, 
    user: Sequelize.INTEGER,
    location: Sequelize.INTEGER,
    document: Sequelize.INTEGER }
);

Comment.sync();

module.exports = Comment;