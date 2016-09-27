var Sequelize = require('sequelize');
var sqlConnection = require('../config.js');
var User = require('User');
var Document = require('Document');

UserDocument = sequelize.define('user_document', {
  status: Sequelize.STRING
});

User.belongsToMany(Project, { through: UserDocument });
Document.belongsToMany(User, { through: UserDocument });

User.sync();
Document.sync();
UserDocument.sync();