/**
 * Gets documents for a given user or a document given a doc_id
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.getDocuments = function(req, res) {
  if (req.query.user) {
  	res.send(req.query.user);
  } else if (req.query.doc_id) {
    res.send(req.query.doc_id);
  }
  res.status(400).send('Query string parameter for "user" or "doc_id" is needed.')
};

/**
 * Creates a document
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.createDocument = function(req, res) {
  res.send('create a document');
};

/**
 * Updates a document
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.updateDocument = function(req, res) {
  res.send('update a document');
};

/**
 * Deletes a document
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.deleteDocument = function(req, res) {
  res.send('delete all documents');
};
