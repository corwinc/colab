import React from 'react';
import { render } from 'react-dom';
import TextEditor from './textEditor.jsx';
import AppVideo from './video.jsx';
import Chat from './chat.jsx';
import NavBar from './navbar.jsx';
import FlashMessagesList from '../../auth/components/flash/flashMessagesList.jsx';
import CommentArea from '../../comments/components/CommentArea.jsx';

// /* COMPONENT WITHOUT CHAT */
export default class TextVideoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curUser: 2,
      curDoc: 2,
      curSharedUsers: [],
      selectionLoc: null,
      commentEntryHeight: 50,
      activeCommentStatus: false,
      commentInput: '',
      comments: [],
      savedCommentFocus: false,
      sharelinkId: 'CC1476140584551'
    };

    this.getSharedUsers = this.getSharedUsers.bind(this);
    this.getInitials = this.getInitials.bind(this);
    this.setSelectionLoc = this.setSelectionLoc.bind(this);
    this.getDocId = this.getDocId.bind(this);
  };

  componentWillMount() {
    this.getDocId(this.state.sharelinkId);
  }

  getSharedUsers (docId, userId) {
    // send request to server
    console.log('inside FE getSharedUsers');
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
        this.setState({curSharedUsers: data});
        console.log('state sharedusers:', this.state.curSharedUsers);
      },
      error: (err) => {
        console.log('getSharedUsers error:', err);
      }
    })
  }

  getDocId(sharelinkId) {
    $.ajax({
      method: 'GET',
      url: '/document/id',
      dataType: 'json',
      data: {
        sharelinkId: sharelinkId
      },
      success: (data) => {
        console.log('DOC W/ given sharelink:', data);
        var docId = data.id;
        this.setState({curDoc: docId});
      },
      error: (err) => {
        console.log('getDocId error:', err);
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
            curDoc={this.state.curDoc}
            curUser={this.state.curUser}
            curSharedUsers={this.state.curSharedUsers} 
            getSharedUsers={this.getSharedUsers}
            getInitials={this.getInitials} />
        </div>
        <FlashMessagesList />
        <TextEditor setSelectionLoc={this.setSelectionLoc} />
        <AppVideo />
        <CommentArea />
        {console.log('STATE:', this.state)}
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
