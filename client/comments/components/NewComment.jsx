import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';
import CommentEntryLinks from './CommentEntryLinks.jsx';

class NewComment extends React.Component {
  constructor(props) {
    super(props);

    this.handleCommentInput = this.handleCommentInput.bind(this);
    this.updateCommentHeight = this.updateCommentHeight.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.updateCommentHeight();
  }

  handleCommentInput (e) {
    e.preventDefault();
    this.props.handleCommentInput(e.target.value);
  }

  updateCommentHeight() {
    if (this.props.commentInput !== '') {
      this.props.updateCommentHeight(70);
      this.props.activeCommentStatus(true);
    } else {
      this.props.updateCommentHeight(50);
      this.props.activeCommentStatus(false);
    }
  }

  render() {

    return (
      <div className="comment-container">
        <div className="comment" style={{top: this.props.selectionLoc - 40, height: this.props.commentEntryHeight}}>
          <div className="comment-chathead">
            <span className="comment-initials">{this.props.curUserInitials}</span>
            <input 
              value={this.props.commentInput}
              className="comment-input" 
              placeholder="New comment" 
              onChange={(e) => {this.handleCommentInput(e); this.updateCommentHeight();}}
              autoFocus={true} />
            {(() => {
              if (this.props.activeComment === true) {
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
    selectionLoc: state.editor.selectionLoc,
    commentInput: state.comment.commentInput,
    commentEntryHeight: state.comment.commentEntryHeight,
    activeComment: state.comment.activeCommentStatus,
    curUserInitials: state.tvPage.curUserInitials
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleCommentInput: commentActions.handleCommentInput,
    updateCommentHeight: commentActions.updateCommentHeight,
    activeCommentStatus: commentActions.activeCommentStatus
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
