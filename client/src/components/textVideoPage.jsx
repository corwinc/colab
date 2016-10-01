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
      curDoc: 2,
      curSharedUsers: dummyUsers
    };
  };

  render() {
    return (
      <div>
        <div className="NavBar">
          <NavBar curDoc={this.state.curDoc} curSharedUsers={this.state.curSharedUsers} />
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