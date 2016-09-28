var Sequelize = require('sequelize');
var sqlConnection = require('../config.js');
var User = require('./User');
var Document = require('./Document');

UserDocument = sqlConnection.define('user_document', {
  status: Sequelize.STRING
});

User.belongsToMany(Document, { through: UserDocument });
Document.belongsToMany(User, { through: UserDocument });

User.sync();
Document.sync();
UserDocument.sync();

module.exports = UserDocument;