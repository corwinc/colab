var express = require('express');
var passport = require('passport');
var passportjs = require('../../config/passport.js')(passport);

var Validator = require('validator');
var isempty = require('lodash/isEmpty');
var usersRouter = express.Router();
var usersController = require('../controllers/usersController');

usersRouter.use(passport.initialize());

usersRouter.route('/users')
  .get(usersController.getUser)
  .post(usersController.createUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser)

  //facebook oauth routes
  usersRouter.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}))
  usersRouter.get('/auth/facebook/callback',
  	passport.authenticate('facebook'), usersController.oauthSuccess); //

///////////////////////////////////

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
// app.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

  /////////////////////////////////////
module.exports = usersRouter;

