import React from 'react';
import { render } from 'react-dom';
import TextEditor from './TextEditor.jsx';
import AppVideo from './Video.jsx';
import Chat from './Chat.jsx';
import NavBar from './NavBar.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="NavBar">
          <NavBar />
        </div>
        <div className="TextEditor">
          <TextEditor />
        </div>
        <div className="Video">
          <AppVideo />
          <Chat />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
