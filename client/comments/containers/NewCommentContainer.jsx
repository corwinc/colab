import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';
import CommentEntryLinks from './CommentEntryLinksContainer.jsx';

var initials = 'CC';

class NewComment extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="comment-container">
        <div className="comment" style={{top: this.props.selectionLoc - 16, height: this.props.commentEntryHeight}}>
          <div className="comment-chathead">
            <span className="comment-initials">{initials}</span>
            <input 
              value={props.commentInput}
              className="comment-input" 
              placeholder="New comment" 
              onChange={(e) => this.props.handleCommentInput(e)}
              autoFocus={true} />
            {(() => {
              if (this.props.activeCommentStatus === true) {
                return <CommentEntryLinks />;
              }
            })()}
          </div>
        </div>
      </div>    )
  }
}

function mapStateToProps(state) {
  return {
    selectionLoc: state.selectionLoc,
    commentInput: state.commentInput,
    commentEntryHeight: state.commentEntryHeight,
    activeCommentStatus: state.activeCommentStatus
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleCommentInput: commentActions.handleCommentInput
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
