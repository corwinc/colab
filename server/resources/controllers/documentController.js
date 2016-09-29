var Document = require('../../../db/Models/Document');
var UserDocument = require('../../../db/Models/UserDocument');

/**
 * Gets documents for a given user or a document given a doc_id
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.getDocuments = function(req, res) {
  Document.findOne({
  	where: req.query
  })
  .then(function(doc) {
    res.send(doc);
  })
  .catch(function(doc) {
    res.status(500).send('Error getting document.');
  });
};

/**
 * Creates a document
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */

/**
 * Need to modify later to enforce many-many relationship
 * http://docs.sequelizejs.com/en/latest/docs/associations/
 */
exports.createDocument = function(req, res) {
  Document.findAndCountAll({
  	where: {
  	  sharelink: req.body.sharelink   	
  	}
  })
  .then(function (result) {
    if (result.count === 0) {
    	// create document
    	Document.create(req.body)
    	  .then(function(doc) {
          res.send(doc);
    	  })
    	  .catch(function(error) {
          res.status(500).send('Error creating the document:' + error);
    	  });
    } else {
    	res.status(500).send('Document with this sharelink already exists.');
    }
  })
  .catch(function (error) {
    res.send(error);
  });
  // res.send('create a document');
};

/**
 * Updates a document
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.updateDocument = function(req, res) {
	Document.findOne({
		where: {
			sharelink: req.body.sharelink
		}
	})
	.then(function(doc) {
	  doc.update(req.body)
	    .then(function(doc) {
	    	res.send(doc);
	    })
	    .catch(function(error) {
	    	res.status(500).send('Error updating the document.');
	    });
	})
	.catch(function(error) {
    res.status(500).send('Document with this sharelink does not exist.');
	});
};

/**
 * Deletes a document
 * @param {Object} req
 * @param {Object} res
 * @return undefined
 */
exports.deleteDocument = function(req, res) {
	Document.findOne({
		where: req.query
	})
	.then(function(doc) {
    doc.destroy()
      .then(function(doc) {
        res.send(doc);
      })
      .catch(function(error) {
      	res.status(500).send('Error deleting the document.');
      })
	})
	.catch(function(error) {
    res.status(500).send('Error finding the document.');
	});
};
