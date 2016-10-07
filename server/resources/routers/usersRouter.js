var express = require('express');
var Validator = require('validator');
var isempty = require('lodash/isEmpty');
var usersRouter = express.Router();
var usersController = require('../controllers/usersController');

usersRouter.route('/')
  .get(usersController.getUser)
  .post(usersController.createUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);


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
