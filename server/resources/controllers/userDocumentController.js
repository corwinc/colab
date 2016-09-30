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
exports.getSharedUsers = function(req, res) {
  
};
