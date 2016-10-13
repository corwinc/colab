import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as navbarActions from '../actions/navbarActions.jsx';
import axios from 'axios';
const documentChannel = io('/document');


window.myId = Math.floor(Math.random() * 10000);
// STATEFUL B/C ADDING COMPONENTWILLMOUNT
class NavBar extends React.Component {
  constructor(props) {
    super(props);
  };

// Probably, the logic for getting shared users should be an effect of textEditor mounting
  componentWillMount() {
    // FOR GETTING DOCID & USERID FROM STATE // ERROR: NOT GETTING SET IN TIME TO USE THEM HERE, THEY ARE NULL
    // var docId = this.props.curDoc;
    // var userId = this.props.userId;

    // GET USERID + DOCID => SHARED USERS ON THE DOC // BANDAID FOR NOT GETTING VALUES FROM STATE
    var urldocId = window.location.search.split('').splice(11).join('');
    var username = window.localStorage.user.slice(1, window.localStorage.user.length - 1);
    var sharelinkId = urldocId.length === 0 ? 'hr46' : urldocId; // default to public doc if there is no doc id in url
    var docId = null;

    $.ajax({
      method: 'GET',
      url: '/document/id',
      dataType: 'json',
      data: {
        sharelinkId: sharelinkId
      },
      success: (data) => {
        console.log('NAVBAR found docID from sharelink:', data);
        var docId = data.id;
        axios.get('users/id/?username=' + username)
          .then(function(res) {
            console.log('NAVBAR success getting userId:', res.data);
            var userId = res.data;
            this.props.setUserId(userId);
            this.props.getSharedUsers(docId, userId);
          }.bind(this))
          .catch(function(err) {
            console.log('NAVBAR Error retrieving user.')
          });
      },
      error: (err) => {
        console.log('TVP getDocId error:', err);
      }
    })

  }

  render() {
    return (
      <div className="navbar-container">
        <div className="navbar">
          <div className="navbar-title">ColLab</div>
          <div className="navbar-right">
            <div className="chathead-container">
              <ul className="chathead-list">
                {this.props.curSharedUsers.map((user, i) => {
                  var initials = this.props.getInitials(user); 
                  return (
                    <li key={i}
                      id={user.id}
                      onClick={ ()=>{
                        var pcKey = this.props.userId + '---' + user.id;
                        this.props.startCall(true, pcKey, 'direct call', user.id)
                      }} 
                    >
                      <span className="chathead-initials">{initials}</span>
                    </li> 
                  )             
                })}
              </ul>
            </div>
            <div className="navbar-button-container">
              <div className="share-button"><button onClick={ ()=>{this.props.startConferenceCall()}}>Conference Call</button></div>
              <div className="share-button"><button>Share</button></div>
              <div className="logout-link">
                <a href="/logout" onClick={()=>{ var docId = this.props.docId;
                                                var userId = parseInt(this.props.userId);
                                                documentChannel.emit('user leaving document', JSON.stringify({"documentId": docId, "exitingUserId": userId}))}}>logout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};


function mapStateToProps(state) {
  console.log('NAVBAR state mapStateToProps:', state);
  return {
    docId: state.tvPage.curDoc,
    // userId: state.documentlist.curUser,
    userId: state.navbar.userId,
    sharelink: state.editor.sharelinkId, 
    startCall: state.videoList.startCall, 
    startConferenceCall: state.videoList.startConferenceCall
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserId: navbarActions.setUserId
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);




