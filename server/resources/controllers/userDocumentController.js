var db = require('../../../db/config.js');
var UserDoc = require('../../../db/Models/UserDocument.js');
var User = require('../../../db/Models/User');
var Document = require('../../../db/Models/Document');
var Promise = require('bluebird');


// USE CASE: user selects button to create new doc
exports.createUserDoc = function(req, res, next) {
  // var userId = req.body.userId;
  var docId = req.body.docId;
  console.log('inside createUserDoc, body:', req.body);

  // User.findOne({where: {id: userId}})
  User.findOne({where: {username: req.body.username}})
    .then(function(user) {
      Document.find({where: {id: docId}})
        .then(function(document) {
          user.addDocument(document);
          res.send('Created UserDoc entry');
        })
    })
};

// USE CASE: on Text Component / NavBar Component load, get shared users
// note: may want to modularize to be 1. getUserDocs, 2. Get sharedUsers
exports.getSharedUsers = function(req, res, next) {
  var docId = Number(req.query.docId);
  var curUserId = Number(req.query.userId);

  // 1. Find all UserDoc entries
  UserDoc.findAll({where: {documentId: docId}})
    .then(function(userDocs) {
      // 2. Get all userIds associated with doc
      // res.send(userDocs);
      var sharedUserIds = userDocs.map(function(userDoc) {
        return userDoc.userId;
      });

      // 3. If this is the current user's first time opening the doc, consider it 'shared' with him/her. 
      // => Render a chat head for current user and create new UserDoc entry
      if (sharedUserIds.indexOf(curUserId) === -1) {
        sharedUserIds.push(curUserId);

        User.findOne({where: {id: curUserId}})
          .then(function(user) {
            Document.find({where: {id: docId}})
              .then(function(document) {
                user.addDocument(document);
              })
          })
          .then(function() {
            return sharedUserIds;
          })
      }

      return sharedUserIds;
    })
    .then(function(userIds) {
      // 4. For each userId, get the user objects
      return Promise.map(userIds, function(userId) {
        return User.findOne({where: {id: userId}});
      });
    })
    .then(function(array) {
      // 5. Create a filtered version of the user object that doesn't include sensitive / irrelevant info, e.g. password
      var filteredUsers = array.map(function(user) {
        var filteredUser = {};
        filteredUser.id = user.id;
        filteredUser.firstname = user.firstname;
        filteredUser.lastname = user.lastname;
        filteredUser.email = user.email;

        return filteredUser;
      })

      res.send(filteredUsers);
    })
};



exports.deleteUserDoc = function(req, res, next) {
  // TODO: fill out
}









