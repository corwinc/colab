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
  res.send('create a comment');
};
