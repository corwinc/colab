var express = require('express');
var commentsRouter = express.Router();
var commentsController = require('../controllers/commentsController');

commentsRouter.route('/')
  .get(commentsController.getComments)
  .post(commentsController.createComment)
  .delete(commentsController.deleteComment)

module.exports = commentsRouter;
