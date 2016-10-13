import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';

class SavedCommentFocused extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('PASSED IN COMMENT SCF:', this.props.comment);
    return (
      <div className="comment-saved-focused" style={{top: this.props.comment.location - 56}} onClick={() => this.props.setFocus(false)}>
        <div className="comment-saved-chathead">
          <span className="comment-saved-initials">{this.props.comment.initials}</span>
        </div>
        <div className="comment-saved-text">{this.props.comment.text}</div>
      </div>
    )
  }
}

export default connect()(SavedCommentFocused);