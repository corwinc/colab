import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';

var initials = 'CC';

class SavedComment extends React.Component {

  render() {
    return (
      <div className="comment-saved-container">
        <div className="comment-saved" style={{top: this.props.comment.location - 16}}>
          <div className="comment-saved-chathead" onClick={() => this.props.handleCommentClick()}>
            <span className="comment-saved-initials">{initials}</span>
          </div>
          <div className="comment-saved-text">{this.props.comment.text}</div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleCommentClick: commentActions.handleCommentClick
  }, dispatch);
}

export default connect(mapDispatchToProps)(SavedComment);