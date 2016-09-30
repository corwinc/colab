import React from 'react';
import { render } from 'react-dom';

class TextEditor extends React.Component {

  render () {
  	return (
	    <div className="jumbotron">
	      <h3>Document</h3>
	      <div contentEditable="true"><span>type here</span></div>
	    </div>
	);
  }
} 

export default TextEditor;