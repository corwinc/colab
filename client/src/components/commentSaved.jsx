import React from 'react';
import { render } from 'react-dom';

// TEMP DUMMY DATA
var initials = 'CC';


// NEXT::::::::::: RENDER FOCUSED VIEW
// var renderComment = () => {
//   if (props.savedCommentFocus) {
//     console.log('hey! it's focused);
//   } else {
//     console.log('no focus baby');
//   }
// }

const CommentSaved = (props) =>
      <div className="comment-saved-container">
        <div className="comment-saved" style={{top: props.comment.location - 16}}>
          <div className="comment-saved-chathead" onClick={() => props.handleCommentClick()}>
            <span className="comment-saved-initials">{initials}</span>
          </div>
          <div className="comment-saved-text">{props.comment.text}</div>
        </div>
      </div>

export default CommentSaved;