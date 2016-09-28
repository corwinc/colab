import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import TextEditor from './TextEditor.jsx';

class App extends React.Component {
  render () {
    return (
    	<div>
	        <TextEditor />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));