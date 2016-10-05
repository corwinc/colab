import React from 'react';
import { render } from 'react-dom';
import Comment from './comment.jsx';

const CommentArea = (props) =>
      <div className="comment-area-container">
        <Comment selectionLoc={props.selectionLoc} />
      </div>;

export default CommentArea;