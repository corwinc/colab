import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';
import axios from 'axios';


class SavedComment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="comment-saved-container" onClick={() => this.props.deleteComment(this.props.comment.id)}>
        <div className="comment-saved" style={{top: this.props.comment.location - 56}}>
          <div className="comment-saved-chathead">
            <span className="comment-saved-initials">{this.props.comment.initials}</span>
          </div>
          <div className="comment-saved-text">{this.props.comment.text}</div>
        </div> 
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteComment: commentActions.deleteComment
  }, dispatch);
}

export default connect(mapDispatchToProps)(SavedComment);

