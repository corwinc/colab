import React from 'react';
import { render } from 'react-dom';

const CommentEntryLinks = (props) =>
      <div className="entry-links-container">
        <a className="entry-link-post" href="http://localhost:8000">post</a>
        <a className="entry-link-cancel" onClick={() => props.cancelEntry()}>cancel</a>
      </div>;

export default CommentEntryLinks;