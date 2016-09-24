var express = require('express');
var documentRouter = express.Router();
var documentController = require('../controllers/documentController');

documentRouter.route('/')
  .get(documentController.getDocuments)
  .post(documentController.createDocument)
  .put(documentController.updateDocument)
  .delete(documentController.deleteDocument);

module.exports = documentRouter;
