import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as navbarActions from '../actions/navbarActions.jsx';
import axios from 'axios';

window.myId = Math.floor(Math.random() * 10000);

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  };

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

  render() {
    return (
      <div className="navbar-container">
        <div className="navbar">
          <div className="navbar-title">ColLab</div>
          <div className="navbar-right">
            <div className="chathead-container">
              <ul className="chathead-list">
                {this.props.curSharedUsers.map((user, i) => {
                  console.log('MAPPING USER:', user);
                  var initials = this.getInitials(user); 
                  return (
                    <li key={i}
                      id={user.id}
                      onClick={ ()=>{
                        var pcKey = myId + '---' + user.id;
                        if (isConnectionAlreadyMade(pcKey)){
                          console.log("You're already connected to this user. Womp womp.");
                          return;
                        }
                        if (user.id !== myId) { 
                          initSingleCall(pcKey, 'direct call');
                        } else {
                          console.log("You can't call yourself, silly goose!");
                        }
                      }} 
                    >
                      <span className="chathead-initials">{initials}</span>
                    </li> 
                  )             
                })}
              </ul>
            </div>
            <div className="navbar-button-container">
              <div className="share-button"><button onClick={ ()=>{initConferenceCall()}}>Conference Call</button></div>
              <div className="share-button"><button>Share</button></div>
              <div className="logout-link"><a href="/logout">logout</a></div>
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
    userId: state.navbar.userId,
    sharelink: state.editor.sharelinkId,
    curSharedUsers: state.tvPage.curSharedUsers
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setUserId: navbarActions.setUserId
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);




