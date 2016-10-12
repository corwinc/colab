import React from 'react';
import { render } from 'react-dom';
import CommentEntryLinks from './commentEntryLinks.jsx';

// TEMP DUMMY DATA
var initials = 'CC';

const Comment = (props) =>
      <div className="comment-container">
        <div className="comment" style={{top: props.selectionLoc - 16, height: props.commentEntryHeight}}>
          <div className="comment-chathead">
            <span className="comment-initials">{initials}</span>
            <input 
              value={props.commentInput}
              className="comment-input" 
              placeholder="New comment" 
              onChange={(e) => props.handleCommentInput(e)}
              autoFocus={true} />
            {(() => {
              if (props.activeCommentStatus === true) {
                return <CommentEntryLinks cancelEntry={props.cancelEntry} postEntry={props.postEntry} />;
              }
            })()}
          </div>
        </div>
      </div>

export default Comment;
