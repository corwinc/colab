var express = require('express');
var usersRouter = express.Router();
var usersController = require('../controllers/usersController');

usersRouter.route('/')
  .get(usersController.getUser)
  .post(usersController.createUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = usersRouter;
