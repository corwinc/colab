import React from 'react';
import { render } from 'react-dom';
import Comment from './comment.jsx';
import CommentSaved from './commentSaved.jsx';
import * as commentActions from '../actions/commentActions.jsx';

const CommentArea = (props) =>
    <div>
      <CommentAreaContainer />
    </div>

export default CommentArea;  

