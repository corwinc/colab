import React from 'react';
import { render } from 'react-dom';
import TextEditor from './textEditor.jsx';
import AppVideo from './video.jsx';
import Chat from './chat.jsx';
import NavBar from './navbar.jsx';

// /* COMPONENT WITHOUT CHAT */
export default class TextVideoPage extends React.Component {
  render() {
    return (
      <div>
        <div className="NavBar">
          <NavBar />
        </div>
        <button id="newdoc">New Document</button>
        <div id="editor">
          <p>Type here...</p>
        </div>
        <div className="video-and-chat">
          <AppVideo className="Video"/>
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