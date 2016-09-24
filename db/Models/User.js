var sequelize = require('sequelize');
var sqlConnection = require('../config.js');

var User = sqlConnection.define('user', 
  { firstname: Sequelize.String,
    lastname: Sequelize.String, 
    username: Sequelize.String,
    email: Sequelize.String });

User.sync();

module.exports.User = User;


