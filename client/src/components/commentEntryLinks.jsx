import React from 'react';
import { render } from 'react-dom';

const CommentEntryLinks = (props) =>
      <div className="entry-links-container">
        <a className="entry-link-post" onClick={() => props.postEntry()} >post</a>
        <a className="entry-link-cancel" onClick={() => props.cancelEntry()}>cancel</a>
      </div>;

export default CommentEntryLinks;