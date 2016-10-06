var Sequelize = require('sequelize');
var sqlConnection = require('../config.js');

var Document = sqlConnection.define('document', 
  { textS3: Sequelize.STRING, 
    sharelink: Sequelize.STRING ,
    title: Sequelize.STRING
  }
);

// Syncing here is redundant. It is already occurring in UserDocument.js.
//Document.sync();

module.exports = Document;