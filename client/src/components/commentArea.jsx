import React from 'react';
import { render } from 'react-dom';
import Comment from './comment.jsx';

const CommentArea = (props) =>
      <div className="comment-area-container">
        {(() => {
          console.log('onload slectionLoc:', props.selectionLoc);
          if (props.selectionLoc !== null) {
            return (<Comment selectionLoc={props.selectionLoc} />);
          }})()}
      </div>;

export default CommentArea;


// {if (props.selectionLoc !== null) {
//     return <Comment selectionLoc={props.selectionLoc} />;
//   }}