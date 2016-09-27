var Sequelize = require('sequelize');
var sqlConnection = require('../config.js');

var Document = sqlConnection.define('document', 
  { textS3: Sequelize.STRING, 
    sharelink: Sequelize.STRING };
  );