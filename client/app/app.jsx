import React from 'react';
import { render } from 'react-dom';
import TextEditor from './TextEditor.jsx';
import AppVideo from './Video.jsx';

class App extends React.Component {
  render() {
    return (
    	<div className="TextEditor">
	      <div>
	        <TextEditor />
	      </div>
	      <div>
	        <AppVideo />
	      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
