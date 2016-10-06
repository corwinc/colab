var express = require('express');
var documentRouter = express.Router();
var documentController = require('../controllers/documentController');
var userDocumentController = require('../controllers/userDocumentController');

documentRouter.route('/')
  .get(documentController.getDocument)
  .post(documentController.createDocument, userDocumentController.createUserDoc)
  .put(documentController.updateDocument)
  .delete(documentController.deleteDocument);

documentRouter.route('/all')
  .get(documentController.getDocuments);

module.exports = documentRouter;