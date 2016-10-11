import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as navbarActions from '../actions/navbarActions.jsx';

window.myId = Math.floor(Math.random() * 10000);
// STATEFUL B/C ADDING COMPONENTWILLMOUNT
class NavBar extends React.Component {
  constructor(props) {
    super(props);
  };

// Probably, the logic for getting shared users should be an effect of textEditor mounting
  componentWillMount() {
    console.log('inside NavBar componentWillMount');
    // var docId = this.props.curDoc;
    var docId = this.props.docId;
    console.log('new docId:', docId);
    var userId = this.props.curUser;
    this.props.getSharedUsers(docId, userId);
    // this.props.setSharedUsersState(sharedUsers);

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
  return {
    docId: state.documentlist.curDocId,
    sharelink: state.editor.sharelinkId
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    something: navbarActions.something
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);




