/**
 * Get user
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.getUser = function(req, res) {
  res.send('get user');
};

/**
 * Create user
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.createUser = function(req, res) {
	res.send('create user');
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
