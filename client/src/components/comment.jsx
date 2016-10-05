import React from 'react';
import { render } from 'react-dom';
import CommentEntryLinks from './commentEntryLinks.jsx';

// TEMP DUMMY DATA
var initials = 'CC';

// var links; 
// if (props.commentEntryHeight === 80) {
//   links = <a href="http://localhost:8000">post</a>;
// } else {
//   links = null;
// }

const Comment = (props) =>
      <div className="comment-container">
        <div className="comment" style={{top: props.selectionLoc - 16, height: props.commentEntryHeight}}>
          <div className="comment-chathead">
            <span className="comment-initials">{initials}</span>
            <input 
              value={props.commentInput}
              className="comment-input" 
              placeholder="New comment" 
              onChange={(e) => props.handleCommentInput(e)} />
            {(() => {
              if (props.activeCommentStatus === true) {
                return <CommentEntryLinks cancelEntry={props.cancelEntry} postEntry={props.postEntry} />;
              }
            })()}
          </div>
        </div>
      </div>

export default Comment;


            // <span className="comment-placeholder">New comment</span>



            // {(() => {
            //   if (props.commentEntryHeight === 80) {
            //     console.log('haaaaay');
            //     return <div>Haaaaay</div>;
            //   })()
            // }}