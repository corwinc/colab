var db = require('../../../db/config.js');
var User = require('../../../db/Models/User');
console.log("USER IS: ", User);
/**
 * Get user
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */ 
exports.getUser = function(req, res) {
  // TODO: Check which params are given in the request, customize the db query accordingly
  // if (req.query.username) {
  //   for (key in req.query.params) {
  //     dbQueryParams[key] = req.query.params[key];
  //   }
  // }
  User.findOne({username: req.query.username})
    .then(function(user){
      if (user !== undefined) {
        res.send(user);
      } else {
        res.status(404).send('User not found.');
      }
    })
    .catch(function(error){
      res.status(500).send('Error getting user.');
    });
};

/**
 * Create user
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.createUser = function(req, res) {

  User.findOne({username: req.query.username})
    .then(function(user){
      if (user !== null){
        res.send('User already exists.');
      } else {
        // TODO: Use actual data from the req.body, posted from front end. 
        var newUser = {
          firstName: 'Corwin', 
          lastName: 'Crownovet', 
          username: 'ccouioui', 
          email: 'corwinCestMoi@gmail.com', 
          password: 'PASSWORD'
        };
        User.create(newUser)
          .then(function(user){
            res.send(user);
          })
          .catch(function(error){
            res.status(500).send('Error creating the user.');
          })
      }
    });
};

/**
 * Update user
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.updateUser = function(req, res) {
  res.send('update user');
};

/**
 * Delete user
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.deleteUser = function(req, res) {
  res.send('delete user');
};


