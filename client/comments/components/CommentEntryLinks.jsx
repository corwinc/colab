import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';
import * as editorActions from '../../src/actions/editorActions.jsx';

class CommentEntryLinks extends React.Component {

  constructor(props) {
    super(props);
  }

  postEntry () {
    // 'block' is a placeholder for a future feature allowing chaining comments together in a block
    var comment = {
      text: this.props.commentInput,
      block: 1,
      user: Number(this.props.curUser),
      location: this.props.savedSelectionLoc,
      document: this.props.curDoc,
      initials: this.props.curUserInitials
    }

    $.ajax({
      method: 'POST',
      url: '/comments',
      data: comment,
      success: (data) => {
        // After post, reset initial values and call getComments to see latest post
        this.props.setSelectionLoc(null);
        this.props.handleCommentInput('');
        this.props.activeCommentStatus(false);
        this.props.setNewCommentStatus(false);
        this.getComments();
      },
      error: (err) => {
        console.log('Error posting entry:', err);
      }
    })
  }

  cancelEntry () {
    // Reset initial values
    this.props.handleCommentInput('');
    this.props.activeCommentStatus(false);
    this.props.updateCommentHeight(50);
    this.props.setSelectionLoc(null);
    this.props.setNewCommentStatus(false);

  }

  getComments () {
    $.ajax({
      method: 'GET',
      url: '/comments',
      dataType: 'json',
      data: {docId: this.props.curDoc},
      success: (data) => {
        this.props.getCommentsSuccess(data);
      },
      error: (err) => {
        console.log('Error getting comments:', err);
      }
    })
  }

  render() {
    return (
      <div className="entry-links-container">
        <a className="entry-link-post" onClick={() => this.postEntry()}>post</a>
        <a className="entry-link-cancel" onClick={() => this.cancelEntry()}>cancel</a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    savedSelectionLoc: state.editor.savedSelectionLoc,
    commentInput: state.comment.commentInput,
    curUser: state.documentlist.curUser,
    curDoc: state.editor.docId,
    curUserInitials: state.tvPage.curUserInitials
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSelectionLoc: editorActions.setSelectionLoc,
    handleCommentInput: commentActions.handleCommentInput,
    activeCommentStatus: commentActions.activeCommentStatus,
    updateCommentHeight: commentActions.updateCommentHeight,
    getCommentsSuccess: commentActions.getCommentsSuccess,
    setNewCommentStatus: commentActions.setNewCommentStatus
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEntryLinks);
