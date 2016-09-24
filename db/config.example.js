
var sequelize = require('sequelize');

var connectionString = ''; 

var connection = new Sequelize(connectionString, {
  native: true
});

module.exports = connection;