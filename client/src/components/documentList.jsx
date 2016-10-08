import React from 'react';
import { render } from 'react-dom'; // needed?
import axios from 'axios';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as doclist from '../actions/documentlistActions.jsx';

class DocumentList extends React.Component {

  constructor(props) {
  	super(props);
  }

  componentDidMount () {

  	//populate documents array with list of documents for user
    axios.get('document/all?username=' + this.props.username)
      .then(function(res) {
        this.props.dispatch( doclist.populateDocs(res.data));
      }.bind(this))
      .catch(function(err) {
        console.log('Error retrieving user documents:', err);
      });
  }

  createNewDoc (username) {
  	if (this.props.inputValue === '') {
  		this.props.dispatch(doclist.showMessage('Please enter a title.'));
  		return;
  	}
  	this.props.dispatch(doclist.clearMessage());
	  var sharelinkId = 'doc' + Date.now();

	  axios.post('/document', {
	  	username: username,
	  	sharelink: sharelinkId,
	  	title: this.props.inputValue
	  })
	  .then(function(res) {

		  browserHistory.push('/?sharelink=' + sharelinkId);
	  })
	  .catch(function(err) {
      console.log('Error creating the document:', err);
	  });
  }

  deleteDoc (sharelinkId, index, title) {
  	if (confirm('The document "' + title + '" will be deleted.')) {

	  	axios.delete('/document?sharelink=' + sharelinkId)
	  	  .then(function(res) {
	        console.log('doc deleted');
	        var docs = this.props.documents.slice();
	        docs.splice(index, 1);

	        this.props.dispatch( doclist.populateDocs(docs) );
	        console.log('docs after deleting: ', this.props.documents)
	  	  }.bind(this));
	  	} 
  }

  updateInputValue (event) {
  	var val = event.target.value;


  	this.props.dispatch(doclist.setInputvalue(val));
  	// console.log('inputval upd:', this.props.inputValue);
  	// this.setState({
   //    inputValue: val
  	// }, () => {
  	// 	if (val.length > 0) {
   //      this.setState({ message: '' });
   //    }
  	// });
  }

	render() {
		var messageStyle = {
      color: 'red'
		};

		return (
			<div>
		    <button onClick={ () => { this.createNewDoc(this.props.username) } }>New Doc</button>
		    <br />
		    Title: <input value={ this.props.inputValue } onChange={ this.updateInputValue.bind(this) }type='text' placeholder='Enter the title for the document'/>
		    <span style={ messageStyle }>{ this.props.message }</span>
        <br />

		    		    <ul>
		    		    	{ this.props.documents.length > 0 ? this.props.documents.map( (doc, index) => {
		    		    		  return ( 
		    		    		  	<li key={ index }>
		    		    		  	  <a href={ 'http://localhost:8000/?sharelink=' + doc.sharelink }>{ doc.title }</a>
		                      &nbsp;<a onClick={ () => { this.deleteDoc(doc.sharelink, index, doc.title) } }>Delete</a>
		    		    		  	</li> 
		    		    		  );
		    		    	  }) : 'loading...'
		    		      }
		    		    </ul>


		    <br />
      </div>
		  		);
	}
}

DocumentList.propTypes = {
  message: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired,
  documents: React.PropTypes.array.isRequired,
  inputValue: React.PropTypes.string.isRequired
}

export default connect((store) => {
	return {
		message: store.documentlist.message,
		username: store.documentlist.username,
		documents: store.documentlist.documents,
		inputValue: store.documentlist.inputValue
	}
})(DocumentList);
