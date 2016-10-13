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

    this.getSharedUsers = this.getSharedUsers.bind(this);
    this.getDocId = this.getDocId.bind(this);
  };

  componentWillMount() {
    // GET SHARED USERS
    var urldocId = window.location.search.split('').splice(11).join('');
    var username = window.localStorage.user.slice(1, window.localStorage.user.length - 1);
    var sharelinkId = urldocId.length === 0 ? 'hr46' : urldocId; // default to public doc if there is no doc id in url
    this.props.setSharelink(sharelinkId);
    this.getDocId(sharelinkId);
    var docId = null;
    var userId = null;

    // Get docId
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

        // Get userId
        axios.get('users/id/?username=' + username)
          .then(function(res) {
            console.log('NAVBAR success getting userId:', res.data);
            userId = res.data;

            axios.get('/users/user/?id=' + userId)
              .then((res) => {
                console.log('TVPAGE SUCCESS GETTING USER BY ID:', res);

                // Set user initial's (for use in new comments);
                var initials = this.getInitials(res.data);
                this.props.setCurUserInitials(initials);
              })
              .catch((err) => {
                console.log('TVPAGE error getting user by id,', err);
              })

            // Get & set document's shared users 
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
        console.log('TVPAGE getSharedUsers success:', data);
        this.props.setCurSharedUsers(data);
      },
      error: (err) => {
        console.log('TVPAGE getSharedUsers error:', err);
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

  // setSelectionLoc (loc) {
  //   this.setState({selectionLoc: loc});
  // }

  render() {
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <FlashMessagesList />
        <TextEditor />
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
    curSharedUsers: state.tvPage.curSharedUsers,
    curUserInitials: state.tvPage.curUserInitials

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSharelink: editorActions.setLink,
    setDocId: tvPageActions.setDocId,
    setCurSharedUsers: tvPageActions.setCurSharedUsers,
    setCurUserInitials: tvPageActions.setCurUserInitials
    // setUserId: navbarActions.setUserId
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TextVideoPage);
