var express = require('express');
var Validator = require('validator');
var isempty = require('lodash/isEmpty');
var usersRouter = express.Router();
var usersController = require('../controllers/usersController');

usersRouter.route('/')
  .get(usersController.getUser)
  .post(usersController.createUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser)
  .get(usersController.oauthSuccess);

usersRouter.route('/id')
  .get(usersController.getId)
// function validateInput(data) {
// 	let errors = {};
// 	console.log('inside validateInput')
	
// 	if (Validator.isEmpty(data.email)) {
// 		errors.email = 'This field is required';
// 	}
// 	if(!Validator.isEmail(data.email)) {
// 		errors.email = 'Email is invalid';
// 	}
// 	if (Validator.isEmpty(data.firstname)) {
// 		errors.firstname = 'This field is required';
// 	}
// 	if (Validator.isEmpty(data.lastname)) {
// 		errors.lastname = 'This field is required';
// 	}
// 	if (Validator.isEmpty(data.username)) {
// 		errors.username = 'This field is required';
// 	}
// 	if (Validator.isEmpty(data.password)) {
// 		errors.password = 'This field is required';
// 	}
// 	 return {
// 		errors,
// 		isValid: isempty(errors)
// 	}
// }

// usersRouter.post('/', (req, res) => {
// 	console.log(req.body);
// 	const {errors, isValid } = validateInput(req.body);

// 	if (!isValid) {
// 		res.status(400).json(errors);
// 	}
// });


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

// 	let errors = {};
// 	if (Validator.isEmpty(data.identifier)) {
// 		errors.identifier = 'This field is required';
// 	}
// 	if (Validator.isEmpty(data.password)) {
// 		errors.password = 'This field is required';
// 	}
// 	return {
// 		errors,
// 		isValid: isempty(errors)
// 	};
// }
