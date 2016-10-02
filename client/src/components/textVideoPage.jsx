import React from 'react';
import { render } from 'react-dom';
import TextEditor from './textEditor.jsx';
import AppVideo from './video.jsx';
import Chat from './chat.jsx';
import NavBar from './navbar.jsx';

// /* COMPONENT WITHOUT CHAT */
var dummyUsers = [  {
    "id": 2,
    "firstname": "Corwin",
    "lastname": "Crownover###",
    "email": "crwozzzzz@gmail.com"
  },
  {
    "id": 6,
    "firstname": null,
    "lastname": null,
    "email": null
  },
  {
    "id": 7,
    "firstname": "Brandon",
    "lastname": "Tiqui",
    "email": "btiqui@gmail.com"
  }]

export default class TextVideoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      curUser: 2,
      curDoc: 2,
      curSharedUsers: dummyUsers
    };

    this.getSharedUsers = this.getSharedUsers.bind(this);
    this.getInitials = this.getInitials.bind(this);
    this.setSharedUsersState = this.setSharedUsersState.bind(this);
  };

  getSharedUsers (docId, userId) {
    // send request to server
    console.log('inside FE getSharedUsers');
    return [
      {
        "id": 111,
        "firstname": "HEYITWORKS",
        "lastname": "BAM",
        "email": "yooooo@gmail.com"
      }
    ];
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

  setSharedUsersState(users) {
    this.setState({curSharedUsers: users});
    console.log('current shared users:', this.state.curSharedUsers);
  }

  render() {
    return (
      <div>
        <div className="NavBar">
          <NavBar 
            curDoc={this.state.curDoc} 
            curUser={this.state.curUser}
            curSharedUsers={this.state.curSharedUsers} 
            getSharedUsers={this.getSharedUsers}
            getInitials={this.getInitials}
            setSharedUsersState={this.setSharedUsersState} />
        </div>
        <div id="editor">
          <p>Type here...</p>
        </div>
        <div className="Video">
          <AppVideo />
          <Chat />
        </div>
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