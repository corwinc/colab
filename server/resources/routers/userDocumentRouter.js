var express = require('express');
var documentRouter = express.Router();
var userDocumentController = require('../controllers/userDocumentController');

documentRouter.route('/')
  .get(userDocumentController.getSharedUsers)
  .post(userDocumentController.createUserDoc)
  .delete(userDocumentController.deleteUserDoc)

module.exports = userDocumentRouter;