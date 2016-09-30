import React from 'react';
import { render } from 'react-dom';
import TextEditor from './textEditor.jsx';
import AppVideo from './video.jsx';
import Chat from './chat.jsx';
import NavBar from './navbar.jsx';

export default class TextVideoPage extends React.Component {
  render() {
    return (
      <div>
        <div className="NavBar">
          <NavBar />
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
