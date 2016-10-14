import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as navbarActions from '../actions/navbarActions.jsx';
import axios from 'axios';
import { browserHistory } from 'react-router';
const documentChannel = io('/document');


window.myId = Math.floor(Math.random() * 10000);

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  };

  // Get initials for each user's chathead
  getInitials (user) {
    if (user.firstname !== null) {
      var firstInit = user.firstname[0];
    } else {
      var firstInit = '';
    }

    if (user.lastname !== null) {
      var lastInit = user.lastname[0];
    } else {
      var lastInit = '';
    }

    return firstInit + lastInit;
  }

  goToDocs () {
    browserHistory.push('/documentlist');
  }

  render() {
    return (
      <div className="navbar-container">
        <div className="navbar">
          <div className="navbar-title"><span onClick={ this.goToDocs }>ColLab</span></div>
          <div className="navbar-right">
            <div className="chathead-container">
              <ul className="chathead-list">
                {
                  this.props.curSharedUsers.map((user, i) => {
                    var initials = this.getInitials(user); 
                    return (
                      <li key={i}
                        id={user.id}
                        onClick={()=>{
                          var pcKey = this.props.userId + '---' + user.id;
                          this.props.startCall(true, pcKey, 'direct call', user.id) }}>
                        <span className="chathead-initials">{initials}</span>
                      </li> 
                    )             
                  })
                }
              </ul>
            </div>
            <div className="navbar-button-container">
              <div className="share-button"><button onClick={()=>{this.props.startConferenceCall()}}>Conference Call</button></div>
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
  return {
    docId: state.tvPage.curDoc,
    userId: parseInt(state.documentlist.curUser),
    startCall: state.videoList.startCall, 
    startConferenceCall: state.videoList.startConferenceCall,
    curSharedUsers: state.tvPage.curSharedUsers
  }
}

export default connect(mapStateToProps)(NavBar);




