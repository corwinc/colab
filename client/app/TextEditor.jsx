import React from 'react';

class TextEditor extends React.Component {
  constructor(props) {
  	super(props);
  }
  
  render() {
  	return (
      <div contentEditable="true"></div>
  	);
  }
}

export default TextEditor;