var db = require('../../../db/config.js');
var UserDoc = require('../../../db/Models/UserDocument.js');
var User = require('../../../db/Models/User');
var Document = require('../../../db/Models/Document');
var Promise = require('bluebird');


// USE CASE: Immediately after doc create
// After document creation OR when user opens doc, send request to server w/ req that includes userId & docId
// NOTE: THE ABOVE ^ IS BASICALLY THE SAME SCENARIO, CAN COMBINE THEM INTO ONE?: ON DOCUMENT LOAD: 1ST RUN CHECK IF NEW USER, THEN CREATE ENTRY, THEN GET SHARED USERS
exports.createUserDoc = function(req, res, next) {
  var userId = 2;
  var docId = req.body.docId;
  console.log('inside createUserDoc, body:', req.body);

  User.findOne({where: {id: userId}})
    .then(function(user) {
      Document.find({where: {id: docId}})
        .then(function(document) {
          user.addDocument(document);
          res.send('Created UserDoc entry');
        })
    })
};

// USE CASE: on TextComponent OR NavBar load, get shared users
// note: may want to modularize to be 1. getUserDocs, 2. Get sharedUsers
// 1. get UserDoc entries
// 2. Get userIds for each entry
// 3. get userobject for each userId
// 4. modify objects before sending back in the response

// TODO: FE connection needs to pass in docId & current userId

exports.getSharedUsers = function(req, res, next) {
  var docId = req.query.docId;
  var curUserId = req.query.userId;

  UserDoc.findAll({where: {documentId: docId}})
    .then(function(userDocs) {
      var sharedUserIds = userDocs.map(function(userDoc) {
        return userDoc.userId;
      });

      // If current user did not already have an entry, render a chat head and create new UserDoc entry
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
      // For each userId, get the entire user object
      return Promise.map(userIds, function(userId) {
        return User.findOne({where: {id: userId}});
      });
    })
    .then(function(array) {
      // Create a filtered version of the user object that doesn't include sensitive / irrelevant info, e.g. password
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









