import React from 'react';
import { render } from 'react-dom';

// TEMP DUMMY DATA
var initials = 'CC';

class Comment extends React.Component {

  render () {
    return (
      <div className="comment-container">
        <div className="comment">
          <div className="comment-chathead">
            <span className="comment-initials">{initials}</span>
            <input className="comment-input" placeholder="New comment" />

          </div>
        </div>
      </div>
  );
  }
} 

export default Comment;


            // <span className="comment-placeholder">New comment</span>