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
      if (user !== null) {
        return encryption.comparePassword(req.query.password, user.password)
        .then(match => {
          if (match) {
            res.status(200).send(user);
          } else {
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
 * Create user
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
 
exports.createUser = function(req, res) {
  console.log('req.body 1-------->', req.body);
  
  if (Object.keys(req.body).length === 0) {

    ////////////////////////////////////////////facebook
    User.findOne({where: {username: req.user.id} })
      .then(function(user){
        
        if (user !== null){
          res.send('A user with that username already exists.');
        } else {
          var newUser = {
            fb_id: req.user.id,
            fb_name: req.user.displayName,
            username: req.user.id,
          }

          User.create(newUser)
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
    ///////////////////////////////////////////facebook
  } else {
    //////////////////////////////////////////Regular Signup
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
  }


};

/**
 * Oauth
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.oauthSuccess = function(req, res) {
  // console.log('oauthSuccess req.body---------', req.body);
  // console.log('req-------------------------->', req.user.id);
  if (!req.user) { return res.status(404).send({ message: 'Login failed' }); }
  const user = req.user;
  const token = req.user.id;
  exports.createUser(req);

  return res.redirect(`/oauthSuccess?token=${token}&username=${user.id}`);
}


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

  exports.getUserById = function(req, res) {
    console.log('INSIDE GETUSERBYID, id:', req.query.id);
    User.findOne({where: {id: req.query.id}})
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send('Error getting user by id');
      })
  }


