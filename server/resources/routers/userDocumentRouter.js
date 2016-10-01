var express = require('express');
var userDocumentRouter = express.Router();
var userDocumentController = require('../controllers/userDocumentController');

userDocumentRouter.route('/')
  .get(userDocumentController.getSharedUsers)
  .post(userDocumentController.createUserDoc)
  .delete(userDocumentController.deleteUserDoc)

module.exports = userDocumentRouter;