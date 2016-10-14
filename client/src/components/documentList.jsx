import React from 'react';
import { render } from 'react-dom'; // needed?
import axios from 'axios';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as doclist from '../actions/documentlistActions.jsx';
// set curUser: user id using username
const documentChannel = io('/document');

class DocumentList extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {

    var username = window.localStorage.user.slice(1, window.localStorage.user.length - 1);
    axios.get('users/id/?username=' + username)
      .then(function(res) {
        this.props.dispatch( doclist.setUserId(JSON.stringify(res.data) ));
      }.bind(this))
      .catch(function(err) {
        console.log('Error retrieving user.')
      });

    //populate documents array with list of documents for user
    axios.get('document/all?username=' + window.localStorage.user.slice(1, window.localStorage.user.length - 1))
      .then(function(res) {
        this.props.dispatch( doclist.populateDocs(res.data));
      }.bind(this))
      .catch(function(err) {
        console.log('Error retrieving user documents:', err);
      });
  }

  createNewDoc (username) {
    // if (this.props.inputValue === '') {
    //  this.props.dispatch(doclist.showMessage('Please enter a title.'));
    //  return;
    // }
    // this.props.dispatch(doclist.clearMessage());
    var sharelinkId = 'doc' + Date.now();

    axios.post('/document', {
      username: username,
      sharelink: sharelinkId,
      // title: this.props.inputValue
      title: 'untitled'
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
    //  if (val.length > 0) {
   //      this.setState({ message: '' });
   //    }
    // });
  }

  calcTime (time) {
    var unixTime = new Date(time).getTime();
    var now = Date.now();
    var result = '';
    var diff = (now - unixTime) / 1000;

    if ( diff < 60 ) {
      result += Math.round( diff );
      result === '1' ? result += ' second' : result += ' seconds';
    } else if ( diff < 3600 ) {
      result += Math.round( diff / 60 );
      result === '1' ? result += ' minute' : result += ' minutes';
    } else if ( diff < 86400 ) {
      result += Math.round( diff / 3600 );
      result === '1' ? result += ' hour' : result += ' hours';
    } else {
      result += Math.round( diff / 86400 );
      result === '1' ? result += ' day' : result += ' days';
    }
    return 'Last edited ' + result + ' ago.';
  }
  
  openDoc (doc) {
   browserHistory.push('/?sharelink=' + doc);
  }

  test () {
    console.log('--------------->curUser after mount:', this.props.curUser);
  }

  handleCheckbox (id, index, list) {
    list[id] ? delete list[id] : list[id] = index;
  }

  delete () {
    console.log('indexes', this.props.itemsToDelete);


    console.log('docs props:', this.props.documents.slice());
    console.log('Are you sure you want to delete:', this.props.itemsToDelete)
    var keys = Object.keys( this.props.itemsToDelete).map( num => { return Number(num) });

    console.log('keys:', keys);

    axios.delete('/document?sharelink=' + keys)
    .then(function(res) {
      // browserHistory.push('/?sharelink=' + sharelinkId);
      console.log('deleted');

      // modify client, begin testing
      var docs = this.props.documents.slice();
      
      console.log('docs before splice:', docs);
      var i = 0;
      for (var key in this.props.itemsToDelete) {
        console.log('splicing:', this.props.itemsToDelete[key]);
        i === 0 ? docs.splice(this.props.itemsToDelete[key], 1) : docs.splice(this.props.itemsToDelete[key] - 1, 1)
        i++;
      }

      console.log('docs after splice:', docs);
      this.props.dispatch( doclist.populateDocs(docs) ); // store doesn't see change??
      // end testing
    }.bind(this))
    .catch(function(err) {
      console.log('Error deleting docs:', err);
    });
  }

  // Title: <input value={ this.props.inputValue } onChange={ this.updateInputValue.bind(this) }type='text' placeholder='Enter the title for the document'/>
  setCurDocId(docId) {
    this.props.dispatch(doclist.setCurDocId(docId));
  }

  render() {
    var messageStyle = {
      color: 'red'
    };

    var lastUpdateStyle = {
      fontSize: 12,
      color: 'grey'
    };

    var docIconStyle = {
      height: 40,
      width: 25,
      float: 'left',
      marginRight: 10
    };

    var lSidebarStyle = {
      backgroundColor: 'blue',
      height: 100
    };

    var hStyle = {
      fontWeight: 100,
      paddingLeft: 50
    };

    var logoStyle = {
      fontSize: 36,
      fontFamily: 'Arial'
    };

	  return (
		  <div className="container-fluid">
        <div className="row">
          <div id="doclist-left-sidebar" className="col-md-2">
            <h2 style={ logoStyle } >ColLab</h2>
            <a href="/logout">logout</a>
          </div>
          <div className="col-md-8">
            <h1 style={ hStyle } >Docs</h1>
            <br />
            <span style={ messageStyle }>{ this.props.message }</span>
            <br />

              <ul>
                { this.props.documents.length > 0 ? this.props.documents.map( (doc, index) => {
                    return ( 
                      <li className="doclist-li" key={ index }>
                        <div>
                          <img style={ docIconStyle }src="http://images.clipshrine.com/getimg/PngMedium-Paper-3-icon-19797.png" />
                        </div>
                        <div>
                          <a onClick={ () => { this.openDoc( doc.sharelink ); 
                                              this.setCurDocId(doc.id); 
                                              documentChannel.emit('user joining document', JSON.stringify({"documentId": doc.id, "newUserId": parseInt(this.props.curUser)}))} }>{ doc.title }</a>
                          &nbsp;
                          <input className="del-checkbox" onChange={ () => { this.handleCheckbox( doc.id, index, this.props.itemsToDelete ) } } type="checkbox"/>
                          <a className="del-doc-link" onClick={ () => { this.deleteDoc(doc.sharelink, index, doc.title) } }>Delete</a>
                          <br />
                          <span onClick={ this.test.bind(this) } style={ lastUpdateStyle }>{ this.calcTime( doc.updatedAt ) }</span>
                        </div>
                        <hr />
                      </li> 
                    );
                  }) : ''
                }
              </ul>

            <br />
          </div>
          <div className="col-md-2">
            <button id="add-doc" className="btn btn btn-primary btn-large btn-block " onClick={ () => { this.createNewDoc(window.localStorage.user.slice(1, window.localStorage.user.length - 1)) } }>Create new doc</button>
            <button id="del-doc" className="btn btn btn-primary btn-large btn-block" onClick={ this.delete.bind(this) }>Delete</button>
          </div>
        </div>
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
		inputValue: store.documentlist.inputValue,
    curUser: store.documentlist.curUser,
    itemsToDelete: {}
	}
})(DocumentList);
