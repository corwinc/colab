var Document = require('../../../db/Models/Document');
var UserDocument = require('../../../db/Models/UserDocument');
var UserDocController = require('./userDocumentController.js');

/**
 * Gets documents for a given user or a document given a doc_id
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.getDocuments = function(req, res) {
  Document.findOne({
    where: req.query
  })
  .then((doc) => {
    res.send(doc);
  })
  .catch((doc) => {
    res.status(500).send('Error getting documents.');
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
        // res.send(doc);
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
  // res.send('create a document');
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
  Document.findOne({
    where: req.query
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
};
