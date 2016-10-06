import React from 'react';
import { render } from 'react-dom';
import Comment from './comment.jsx';
import CommentSaved from './commentSaved.jsx';

const CommentArea = (props) =>
      <div className="comment-area-container">
        {
          (() => {
            console.log('about to render some badass comments');
            var comments = props.comments;
            console.log('comments about to be rendered:', comments);

            return props.comments.map((comment, i) => {
              return (<CommentSaved key={i} comment={comment} handleCommentClick={props.handleCommentClick} />);
            });
          })()
        }

        {
          (() => {
            console.log('selectionLoc:', props.selectionLoc);
            if (props.selectionLoc !== null) {
              return (<Comment 
                        selectionLoc={props.selectionLoc} 
                        handleCommentInput={props.handleCommentInput}
                        commentInput={props.commentInput}
                        commentEntryHeight={props.commentEntryHeight}
                        activeCommentStatus={props.activeCommentStatus}
                        postEntry={props.postEntry}
                        cancelEntry={props.cancelEntry} />);
            }
          })()
        }
      </div>;

export default CommentArea;  


// {if (props.selectionLoc !== null) {
//     return <Comment selectionLoc={props.selectionLoc} />;
//   }}