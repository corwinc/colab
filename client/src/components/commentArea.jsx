import React from 'react';
import { render } from 'react-dom';
import Comment from './comment.jsx';

class CommentArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  getLocation () {
    console.log('inside getLocation');
    var selection = quill.getSelection();
    console.log('selection:', selection);
    return selection;
  }

  render () {
    return (
      <div className="comment-area-container">
        <Comment />
      </div>
  );
  }
} 

export default CommentArea;