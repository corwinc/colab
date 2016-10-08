var db = require('../../../db/config.js');
var User = require('../../../db/Models/User');
/**
 * Get user
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */ 
exports.getUser = function(req, res) {
  User.findOne({where: req.query})
    .then(function(user){
      if (user !== null) {
        res.send(user);
      } else {
        res.send('User not found.');
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
  User.findOne({where: {username: req.body.username} })
    .then(function(user){
      if (user !== null){
        res.send('A user with that username already exists.');
      } else {
        User.create(req.body)
          .then(function(user){
            res.send(user);
          })
          .catch(function(error){
            res.status(500).send('Error creating the user.');
          })
      }
    })    
    .catch(function(error){
      res.status(500).send('Error finding this user.');
    });
};

/**
 * Update user
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.updateUser = function(req, res) {
  User.findOne({where: {username: req.body.username} })
    .then(function(user){
      user.update(req.body)
        .then(function(user){
          res.send(user);
        })
        .catch(function(error){
          res.status(500).send('Error updating the user.');
        })
    })
    .catch(function(error){
      res.status(500).send('Error finding this user.');
    });
};

/**
 * Delete user
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.deleteUser = function(req, res) {
  User.findOne({where: req.query })
    .then(function(user){
      user.destroy()
        .then(function(user){
          res.send(user);
        })
        .catch(function(error){
          res.status(500).send('Error updating the user.');
        })
    })
    .catch(function(error){
      res.status(500).send('Error finding this user.');
    });
  };


