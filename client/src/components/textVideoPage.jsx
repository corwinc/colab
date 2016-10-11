import React from 'react';
import { render } from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as tvPageActions from '../actions/tvPageActions.jsx';
import * as editorActions from '../actions/editorActions.jsx';
import * as navbarActions from '../actions/navbarActions.jsx';
import TextEditor from './textEditor.jsx';
import AppVideo from './../../video/components/video.jsx';
import Chat from './chat.jsx';
import NavBar from './navbar.jsx';
import FlashMessagesList from '../../auth/components/flash/flashMessagesList.jsx';
import CommentArea from '../../comments/components/CommentArea.jsx';
import axios from 'axios';

// /* COMPONENT WITHOUT CHAT */
class TextVideoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // curUser: 2,
      curSharedUsers: []
    };

    this.getSharedUsers = this.getSharedUsers.bind(this);
    this.getInitials = this.getInitials.bind(this);
    this.setSelectionLoc = this.setSelectionLoc.bind(this);
    this.getDocId = this.getDocId.bind(this);
  };

  componentWillMount() {
    var urldocId = window.location.search.split('').splice(11).join('');
    var username = window.localStorage.user.slice(1, window.localStorage.user.length - 1);
    var sharelinkId = urldocId.length === 0 ? 'hr46' : urldocId; // default to public doc if there is no doc id in url
    this.props.setSharelink(sharelinkId);
    this.getDocId(sharelinkId);
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
            // this.props.setUserId(userId); // set up
            this.getSharedUsers(docId, userId);
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

  getSharedUsers (docId, userId) {
    // send request to server
    console.log('TVP inside FE getSharedUsers');
    $.ajax({
      method: 'GET',
      url: '/userdocs',
      dataType: 'json',
      data: {
        docId: docId,
        userId: userId
      },
      success: (data) => {
        console.log('getSharedUsers success:', data);
        // this.setState({curSharedUsers: data});
        // console.log('state sharedusers:', this.state.curSharedUsers);
        this.props.setCurSharedUsers(data);
      },
      error: (err) => {
        console.log('getSharedUsers error:', err);
      }
    })
  }

  getDocId(sharelinkId) {
    console.log('TVP inside getDocIc');
    $.ajax({
      method: 'GET',
      url: '/document/id',
      dataType: 'json',
      data: {
        sharelinkId: sharelinkId
      },
      success: (data) => {
        console.log('TVP found doc from sharelink:', data);
        var docId = data.id;
        // this.setState({curDoc: docId});
        this.props.setDocId(docId);
      },
      error: (err) => {
        console.log('TVP getDocId error:', err);
      }
    })
  }

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

  setSelectionLoc (loc) {
    this.setState({selectionLoc: loc});
  }

  render() {
    return (
      <div>
        <div>
          <NavBar 
            // curDoc={this.props.curDoc}
            // curUser={this.state.curUser}
            // curSharedUsers={this.state.curSharedUsers} 
            // getSharedUsers={this.getSharedUsers}
            getInitials={this.getInitials}
            getDocId={this.getDocId} />
        </div>
        <FlashMessagesList />
        <TextEditor setSelectionLoc={this.setSelectionLoc} />
        <AppVideo />
        <CommentArea />
      </div>
    );
  }
}



// /* COMPONENT WITH CHAT */
// export default class TextVideoPage extends React.Component {
//   render() {
//     return (
//       <div>
//         <div className="NavBar">
//           <NavBar />
//         </div>
//         <div id="editor">
//           <p>Type here...</p>
//         </div>
//         <div className="video-and-chat">
//           <AppVideo className="Video"/>
//           <Chat className="Chat"/>
//         </div>
//       </div>
//     );
//   }
// }

function mapStateToProps(state) {
  console.log('TVP STATE inside mapStateToProps:', state);
  return {
    curDoc: state.tvPage.curDoc,
    curUser: state.tvPage.curUser,
    sharelinkId: state.editor.sharelinkId,
    curSharedUsers: state.tvPage.curSharedUsers

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSharelink: editorActions.setLink,
    setDocId: tvPageActions.setDocId,
    setCurSharedUsers: tvPageActions.setCurSharedUsers
    // setUserId: navbarActions.setUserId
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TextVideoPage);
