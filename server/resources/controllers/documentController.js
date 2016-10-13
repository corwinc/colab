var Document = require('../../../db/Models/Document');
var UserDocument = require('../../../db/Models/UserDocument');
var UserDocController = require('./userDocumentController.js');
var User = require('../../../db/Models/User');
var UserDoc = require('../../../db/Models/UserDocument.js');

/**
 * Gets documents for a given user or a document given a doc_id
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.getDocuments = function(req, res) {
  // use username to get userid
  // look in join table to get all documentIds for userid
  // look in documents table to get list of matching docIds

  User.findOne({
    where: req.query
  })
  .then(function(user) {
    UserDoc.findAll({
      attributes: ['documentId'],
      where: {
        userId: user.id
      }
    })
    .then(function(userDocs) {
      // get all document id's in array
      var docids = userDocs.map(function(userDoc) {
        return userDoc.documentId;
      });

      // then search Document table using array as a filter
      Document.findAll({
        where: { 
          id: docids
        }
      })
      .then(function(docs) {
        res.send(docs);
      })
      .catch(function(err) {
        res.send('Error finding documents:', err);
      });
    })
    .catch(function(err) {
      res.send('Error finding userdoc records:', err);
    });
  })
  .catch(function(err) {
    res.send('Error finding the user:', err);
  });

};

/**
 * Gets single document given a doc_id
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
 exports.getDocument = function(req, res, next) {
  Document.findOne({
    where: req.query
  })
  .then((doc) => {
    req.body.doc = doc;
    res.send(doc);
  })
  .catch((doc) => {
    res.status(500).send('Error getting document.');
  });
 };

/**
 * Creates a document
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */

/**
 * Need to modify later to pass in user/userId in order to create UserDoc model
 */
exports.createDocument = function(req, res, next) {
  Document.findAndCountAll({
    where: { sharelink: req.body.sharelink }
  })
  .then((result) => {
    if (result.count === 0) {
      Document.create(req.body)
      .then((doc) => {
        req.body.docId = doc.id;
        return next();
      })
      .catch((error) => {
        res.status(500).send('Error creating the document.');
      });
    } else {
      res.status(500).send('Document with this sharelink already exists.');
    }
  })
  .catch((error) => {
    res.send(error);
  });
};

/**
 * Updates a document
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.updateDocument = function(req, res) {
  Document.findOne({
    where: { sharelink: req.body.sharelink }
  })
  .then((doc) => {
    doc.update(req.body)
    .then((document) => {
      res.send(document);
    })
    .catch((error) => {
      res.status(500).send('Error updating the document.');
    });
  })
  .catch((error) => {
    res.status(500).send('Document with this sharelink does not exist.');
  });
};

/**
 * Deletes a document
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.deleteDocument = function(req, res) {
  var ids = req.query.sharelink.split(',').map( item => Number(item));
  if (ids.length === 1) {
    // delete one document
    Document.findOne({
      where: ids[0]
    })
    .then((doc) => {
      doc.destroy()
      .then((document) => {
        res.send(document);
      })
      .catch((error) => {
        res.status(500).send('Error deleting the document.');
      });
    })
    .catch((error) => {
      res.status(500).send('Error finding the document.');
    });
  } else if (ids.length > 1) {
    // batch delete
    Document.findAll({
      where: { 
        id: ids
      }
    })
    .then(function(docs) {
      docs.forEach( doc => {
        doc.destroy();
      })
      
      res.send('deleted');
    })
    .catch(function(err) {
      res.send('Error finding documents:', err);
    });
  }
  console.log('error');
};


exports.getId = function(req, res) {
  console.log('inside getId, req:', req.query);
  Document.findOne({
    where: {sharelink: req.query.sharelinkId}
  })
  .then((doc) => {
    res.send(doc);
  })
  .catch((err) => {
    res.status(500).send('Error finding the document')
  })
}
