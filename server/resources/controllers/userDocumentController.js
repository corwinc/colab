var db = require('../../../db/config.js');
var UserDoc = require('../../../db/Models/UserDocument.js');
var User = require('../../../db/Models/User');
var Document = require('../../../db/Models/Document');
var Promise = require('bluebird');

/// HELPERS ///
// PROBLEM: not returnnig user object as desired --> how to return value out of these query promises?
// var getUser = function(userId) {
//   console.log('getUser userId:', userId);
//   User.findOne({where: {id: userId}})
//     .then(function(user) {
//       console.log('inside then user:', user.dataValues);
//       return user.dataValues;
//     })
// }


// Use case: on doc create
// After document creation OR when user opens doc, send request to server w/ req that includes userId & docId
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

// Use case: on NavBar load, get shared users
// note: may want to modularize to be 1. getUserDocs, 2. Get sharedUsers
// 1. get UserDoc entries
// 2. Get userIds for each entry
// 3. get userobject for each userId
// 4. modify objects before sending back in the response

exports.getSharedUsers = function(req, res, next) {
  var docId = req.query.docId;

  UserDoc.findAll({where: {documentId: docId}})
    .then(function(userDocs) {
      var sharedUserIds = userDocs.map(function(userDoc) {
        return userDoc.userId;
      });

      return sharedUserIds;
    })
    .then(function(userIds) {
      return Promise.map(userIds, function(userId) {
        return User.findOne({where: {id: userId}});
      });
    })
    .then(function(array) {
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









