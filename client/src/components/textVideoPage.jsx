import React from 'react';
import { render } from 'react-dom';
import TextEditor from './textEditor.jsx';
import AppVideo from './video.jsx';
import Chat from './chat.jsx';
import NavBar from './navbar.jsx';
import FlashMessagesList from '../../auth/components/flash/flashMessagesList.jsx';
import CommentArea from './commentArea.jsx';

// /* COMPONENT WITHOUT CHAT */
export default class TextVideoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curUser: 18,
      curDoc: 2,
      curSharedUsers: [],
      selectionLoc: null,
      commentEntryHeight: 50,
      commentInput: ''
    };

    this.getSharedUsers = this.getSharedUsers.bind(this);
    this.getInitials = this.getInitials.bind(this);
    this.setSelectionLoc = this.setSelectionLoc.bind(this);
    this.handleCommentInput = this.handleCommentInput.bind(this);
  };

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

  //////// COMMENT FUNCTIONS /////////

  setSelectionLoc (loc) {
    this.setState({selectionLoc: loc});
  }

  handleCommentInput (e) {
    console.log('inside handleCommentInput');
    e.preventDefault();
    this.setState({commentInput: e.target.value}, () => {
      if (this.state.commentInput !== '') {
        console.log('the input has value!:', this.state.commentInput);
        this.setState({commentEntryHeight: 70});
      } else {
        console.log('the input DOESNOT have value');
        this.setState({commentEntryHeight: 50});
      }
    });
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
        <CommentArea 
          selectionLoc={this.state.selectionLoc} 
          handleCommentInput={this.handleCommentInput}
          commentInput={this.state.commentInput}
          commentEntryHeight={this.state.commentEntryHeight} />
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