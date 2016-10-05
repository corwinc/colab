import React from 'react';
import { render } from 'react-dom'; // needed?
import axios from 'axios';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

class DocumentList extends React.Component {

  constructor(props) {
  	super(props);

  	this.state = {
  		username: 'b', // change later after auth complete
  		documents: [],
  		inputValue: ''
  	}
  }

  componentDidMount () {
  	//populate documents array with list of documents for user
  	console.log('this:', this);
    console.log('username on mount', this.state.username);

    axios.get('document/all?username=' + this.state.username)
      .then(function(res) {
      	console.log('this in axios: ', this);
        console.log('response on mount: ', res.data);
        this.setState({ documents: res.data });
      }.bind(this))
      .catch(function(err) {
        console.log('Error retrieving user documents:', err);
      });
  }

  createNewDoc (username) {
	  var sharelinkId = 'doc' + Date.now();
	  // create doc
	  // pass in username
	  axios.post('/document', {
	  	username: username,
	  	sharelink: sharelinkId,
	  	title: this.state.inputValue
	  })
	  .then(function(res) {

		  browserHistory.push('/?sharelink=' + sharelinkId);
	  })
	  .catch(function(err) {
      console.log('Error creating the document:', err);
	  });
  }

  updateInputValue (event) {
  	this.setState({
      inputValue: event.target.value
  	});
  }

	render() {
		return (
		  <div>
		    <button onClick={ () => { this.createNewDoc(this.state.username) } }>New Doc</button>
		    <br />
		    Title: <input value={ this.state.inputValue } onChange={ this.updateInputValue.bind(this) }type='text' placeholder='Enter the title for the document'/>
		    <h1>Document List</h1>
		    <ul>
		    	{ this.state.documents.length > 0 ? this.state.documents.map( (doc, index) => {
		    		  return ( 
		    		  	<li key={ index }><a href={ 'http://localhost:8000/?sharelink=' + doc.sharelink }>{ doc.sharelink }</a></li> 
		    		  );
		    	  }) : 'loading...'
		      }
		    </ul>
		  </div>
		);
	}
}

export default DocumentList;
