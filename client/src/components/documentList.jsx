import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

class DocumentList extends React.Component {

  constructor(props) {
  	super(props);

  	this.state = {
  		username: 'b', // change later after auth complete
  		documents: []
  	}
  }

  componentDidMount () {
  	//populate documents array with list of documents for user

  }

  createNewDoc (username) {
	  var sharelinkId = 'doc' + Date.now();
	  // create doc
	  // pass in username
	  axios.post('/document', {
	  	username: username,
	  	sharelink: sharelinkId
	  })
	  .then(function(res) {

		  browserHistory.push('/?sharelink=' + sharelinkId);
	  })
	  .catch(function(err) {
      console.log('Error creating the document:', err);
	  });
  }

	render() {
		return (
		  <div>
		    <button onClick={ () => { this.createNewDoc(this.state.username) } }>New Doc</button>
		    <h1>Document List</h1>
		    <ul>
		    	<li><Link to="/?sharelink=doc1475624563132">dogs</Link></li>
		    	<li><Link to="/?sharelink=doc1475624563199">new</Link></li>
		    	<li>c</li>
		    </ul>
		  </div>
		);
	}
}

export default DocumentList;
