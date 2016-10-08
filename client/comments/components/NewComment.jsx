import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';
import CommentEntryLinks from './CommentEntryLinks.jsx';

var initials = 'CC';

class NewComment extends React.Component {
  constructor(props) {
    super(props);

    this.handleCommentInput = this.handleCommentInput.bind(this);
    this.updateCommentHeight = this.updateCommentHeight.bind(this);
  }

  handleCommentInput (e) {
    console.log('inside handleCommentInput');
    e.preventDefault();
    this.props.handleCommentInput(e);
  }

  updateCommentHeight() {
    if (this.state.commentInput !== '') {
      console.log('the input has value!:', this.state.commentInput);
      this.props.updateCommentHeight(70);
      this.props.activeCommentStatus(true);
    } else {
      console.log('the input DOESNOT have value');
      this.props.updateCommentHeight(50);
      this.props.activeCommentStatus(false);
    }
  }

  toggleLinks() {
    // TODO: refactor to call this below in place of the anonymous function: move updateCommentHeight, etc.
  }

  render() {
    return (
      <div className="comment-container">
        <div className="comment" style={{top: this.props.selectionLoc - 16, height: this.props.commentEntryHeight}}>
          <div className="comment-chathead">
            <span className="comment-initials">{initials}</span>
            <input 
              value={this.props.commentInput}
              className="comment-input" 
              placeholder="New comment" 
              onChange={(e) => {this.handleCommentInput(e); this.updateCommentHeight();}}
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
    handleCommentInput: commentActions.handleCommentInput,
    updateCommentHeight: commentActions.updateCommentHeight,
    activeCommentStatus: commentActions.activeCommentStatus
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
