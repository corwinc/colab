var db = require('../../../db/config.js');
var Comment = require('../../../db/Models/Comment');

/**
 * Gets comments
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.getComments = function(req, res) {
  console.log('inside controller\'s get comments');
  var docId = req.query.docId;

  Comment.findAll({where: {document: docId}})
    .then((comments) => {
      res.send(comments);
    })
};

/**
 * Creates a comment
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.createComment = function(req, res) {
  var comment = req.body;

  Comment.create(comment)
    .then(res.send('created a comment'))
};