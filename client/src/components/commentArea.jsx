import React from 'react';
import { render } from 'react-dom';
import Comment from './comment.jsx';

const CommentArea = (props) =>
      <div className="comment-area-container">
        {(() => {
          console.log('selectionLoc:', props.selectionLoc);
          if (props.selectionLoc !== null) {
            return (<Comment selectionLoc={props.selectionLoc} expandCommentEntryView={props.expandCommentEntryView} />);
          }})()}
      </div>;

export default CommentArea;


// {if (props.selectionLoc !== null) {
//     return <Comment selectionLoc={props.selectionLoc} />;
//   }}