var Sequelize = require('sequelize');
var sqlConnection = require('../config.js');

var User = sqlConnection.define('user', 
  { firstname: Sequelize.STRING,
    lastname: Sequelize.STRING, 
    username: Sequelize.STRING,
    email: Sequelize.STRING });

User.sync();

module.exports = User;


