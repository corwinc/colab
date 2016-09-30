var db = require('../../../db/config.js');
var UserDoc = require('../../../db/Models/UserDocument.js');
var User = require('../../../db/Models/User');
var Document = require('../../../db/Models/Document');


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

//use case: on document load, get shared users
// note: may want to modularize to be 1. getUserDocs, 2. Get sharedUsers
exports.getSharedUsers = function(req, res, next) {
  var doc = req.body.doc;
  var docId = req.body.doc.id;
  console.log('inside getSharedUsers');

  UserDoc.findAll({where: {docId: docId}})
    .then(function(userDocs) {
      var sharedUserIds = userDocs.map(function(userDoc) {
        return userDoc.userId;
      });

      sharedUsers = sharedUserIds.map(function(userId) {
        User.findOne({where: {id: userId}})
          .then(function(user) {
            return user;
          })
      })

      req.body.sharedUsers = sharedUsers;
      res.send(sharedUsers);
    })
};

exports.deleteUserDoc = function(req, res, next) {
  // TODO: fill out
}









