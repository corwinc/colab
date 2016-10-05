var db = require('../../../db/config.js');
var Comment = require('../../../db/Models/Comment');

/**
 * Gets comments
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.getComments = function(req, res) {
  res.send('get comments');
};

/**
 * Creates a comment
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.createComment = function(req, res) {
  console.log('comment req.body:', req.body);
  var comment = req.body;

  Comment.create(comment)
    .then(res.send('created a comment'))
};