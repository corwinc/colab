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
      activeCommentStatus: false,
      commentInput: '',
      comments: [],
      savedCommentFocus: false
    };

    this.getSharedUsers = this.getSharedUsers.bind(this);
    this.getInitials = this.getInitials.bind(this);
    this.getComments = this.getComments.bind(this);
    this.setSelectionLoc = this.setSelectionLoc.bind(this);
    this.handleCommentInput = this.handleCommentInput.bind(this);
    this.postEntry = this.postEntry.bind(this);
    this.cancelEntry = this.cancelEntry.bind(this);
    this.handleCommentClick = this.handleCommentClick.bind(this);
  };

  componentWillMount () {
    console.log('componentDidMount');
    this.getComments();
    // render comments from this.state.comments
    // => for each comment, create a jsx element and attach it to DOM
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

  //////// COMMENT METHODS /////////
  getComments () {
    // send request to server
    // on success: setState w/ comments
    // componentDidMount: render comments
    console.log('inside getComments');
    $.ajax({
      method: 'GET',
      url: '/comments',
      dataType: 'json',
      data: {docId: this.state.curDoc},
      success: (data) => {
        console.log('Success getting comments!:', data);
        this.setState({comments: data}, () => {
          console.log('state comments:', this.state.comments);
        });  
      },
      error: (err) => {
        console.log('error getting comments:', err);
      }
    })
  }

  setSelectionLoc (loc) {
    this.setState({selectionLoc: loc});
  }

  handleCommentInput (e) {
    console.log('inside handleCommentInput');
    e.preventDefault();
    this.setState({commentInput: e.target.value}, () => {
      if (this.state.commentInput !== '') {
        console.log('the input has value!:', this.state.commentInput);
        this.setState({commentEntryHeight: 70, activeCommentStatus: true});
      } else {
        console.log('the input DOESNOT have value');
        this.setState({commentEntryHeight: 50, activeCommentStatus: false});
      }
    });
  }

  postEntry () {
    // send POST req to db w/ input data
    var comment = {
      text: this.state.commentInput,
      block: 1,
      user: this.state.curUser,
      location: this.state.selectionLoc,
      document: this.state.curDoc
    }

    $.ajax({
      method: 'POST',
      url: '/comments',
      data: comment,
      success: (data) => {
        console.log('Success posting comment!:', data);
        this.setState({selectionLoc: null});
        this.getComments();
      },
      error: (err) => {
        console.log('error posting entry:', err);
      }
    })
    // on success: remove comment entry and show rendered unfocused comment
  }

  cancelEntry () {
    // remove DOM ==> create activeCommentEntry state?
    this.setState({commentInput: '', activeCommentStatus: false, commentEntryHeight: 50, selectionLoc: null});
  }

  handleCommentClick () {
    this.setState({savedCommentFocus: true});
    // => increase height, add border, add resolve link (delete)
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
          comments={this.state.comments}
          selectionLoc={this.state.selectionLoc} 
          handleCommentInput={this.handleCommentInput}
          commentInput={this.state.commentInput}
          commentEntryHeight={this.state.commentEntryHeight}
          activeCommentStatus={this.state.activeCommentStatus}
          postEntry={this.postEntry}
          cancelEntry={this.cancelEntry}
          handleCommentClick={this.handleCommentClick}
          savedCommentFocus={this.state.savedCommentFocus} />
      </div>
    );
  }
}

// render() {
//     return (
//       <div>
//         <div>
//           <NavBar 
//             curDoc={this.state.curDoc} 
//             curUser={this.state.curUser}
//             curSharedUsers={this.state.curSharedUsers} 
//             getSharedUsers={this.getSharedUsers}
//             getInitials={this.getInitials} />
//         </div>
//         <FlashMessagesList />
//         <TextEditor setSelectionLoc={this.setSelectionLoc} />
//         <AppVideo />
//         <CommentArea 
//           comments={this.state.comments}
//           selectionLoc={this.state.selectionLoc} 
//           handleCommentInput={this.handleCommentInput}
//           commentInput={this.state.commentInput}
//           commentEntryHeight={this.state.commentEntryHeight}
//           activeCommentStatus={this.state.activeCommentStatus}
//           postEntry={this.postEntry}
//           cancelEntry={this.cancelEntry}
//           handleCommentClick={this.handleCommentClick}
//           savedCommentFocus={this.state.savedCommentFocus} />
//       </div>
//     );
//   }


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