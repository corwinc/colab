var Sequelize = require('sequelize');
var sqlConnection = require('../config.js');
var encryption = require('../../server/utils/encryption.js');

var User = sqlConnection.define('user', 
  { firstname: Sequelize.STRING,
    lastname: Sequelize.STRING, 
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    fb_id: Sequelize.STRING,
    fb_name: Sequelize.STRING,
    fb_email: Sequelize.STRING,
    fb_token: Sequelize.STRING, 
    password: Sequelize.STRING, 
  });

// Syncing here is redundant. It is already occurring in UserDocument.js.
// User.sync();

module.exports = User;

User.beforeCreate((user) => {
  if (!user.password) { return Promise.resolve(user); }
  return encryption.hashPassword(user.password)
    .then(hashedPw => {
      user.password = hashedPw;
      console.log('saltedPassword', hashedPw);
    });
});


