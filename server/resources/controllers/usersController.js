var db = require('../../../db/config.js');
var User = require('../../../db/Models/User');
var encryption = require('../../utils/encryption.js');
/**
 * Get user
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */ 
exports.getUser = function(req, res) {
  User.findOne({where: {username: req.query.username}})
    .then(user => {
      console.log('req.query.password', req.query.password);
      console.log('------------>>>>>>>', user.password);
      if (user !== null) {
        return encryption.comparePassword(req.query.password, user.password)
        .then(match => {
           console.log('match ---> ', match);
          if (match) {
            res.status(200).send(user);
          } else {
            console.log('User not found.');
            res.send('User not found.');
          }
        })
      } 
    })
    .catch(function(error){
      res.status(500).send('Error getting user.', error);
    });
};


exports.getId = function(req, res) {
  User.findOne({
    where: {
      username: req.query.username
    }})
    .then(user => {
      res.send(JSON.stringify(user.id));
    })
    .catch(function(error){
      res.status(500).send('Error getting user id.', error);
    });
};

/**
 * Oauth
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
 exports.oauthSuccess = function(req, res) {
  if (!req.user) { return res.status(404).send({ message: 'Login failed' }); }
  const user = req.user;
  const token = req.user;
  return res.redirect(`/oauthsuccess?token=${token}&firstname=${user.firstname}&lastname=${user.lastname}&username=${user.username}&email=${user.email}`);
}

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


