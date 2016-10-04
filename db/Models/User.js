var Sequelize = require('sequelize');
var sqlConnection = require('../config.js');

var User = sqlConnection.define('user', 
  { firstname: Sequelize.STRING,
    lastname: Sequelize.STRING, 
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING, 
  });

// Syncing here is redundant. It is already occurring in UserDocument.js.
// User.sync();

module.exports = User;


