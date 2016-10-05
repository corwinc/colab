import React from 'react';
import { render } from 'react-dom';

// TEMP DUMMY DATA
var initials = 'CC';
var dynamicHeight = 50;

const Comment = (props) =>
      <div className="comment-container">
        <div className="comment" style={{top: props.selectionLoc - 16}}>
          <div className="comment-chathead" style={{height: dynamicHeight}}>
            <span className="comment-initials">{initials}</span>
            <input 
              value={props.commentInput}
              className="comment-input" 
              placeholder="New comment" 
              onChange={(e) => props.handleCommentInput(e)} />
          {/*if input has value, increase comment height + add post/cancel*/}
          </div>
        </div>
      </div>

export default Comment;


            // <span className="comment-placeholder">New comment</span>