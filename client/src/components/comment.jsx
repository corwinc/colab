import React from 'react';
import { render } from 'react-dom';

// TEMP DUMMY DATA
var initials = 'CC';

const Comment = (props) =>
      <div className="comment-container">
        <div className="comment" style={{top: props.selectionLoc - 16}}>
          <div className="comment-chathead">
            <span className="comment-initials">{initials}</span>
            <input 
              className="comment-input" 
              placeholder="New comment" 
              onInput={() => props.expandCommentEntryView()} />
          {/*if input has value, increase comment height + add post/cancel*/}
          </div>
        </div>
      </div>

export default Comment;


            // <span className="comment-placeholder">New comment</span>