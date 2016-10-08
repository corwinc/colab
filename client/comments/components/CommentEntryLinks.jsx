import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';

class CommentEntryLinks extends React.Component {
  componentDidMount() {
  }

  postEntry () {
    var comment = {
      text: this.props.commentInput,
      block: 1,
      user: this.props.curUser,
      location: this.props.selectionLoc,
      document: this.props.curDoc
    }

    $.ajax({
      method: 'POST',
      url: '/comments',
      data: comment,
      success: (data) => {
        console.log('Success posting comment!:', data);
        // this.props.postEntrySuccess(data); 
        // => update state w/ new comment...  and therefor can we avoid reusing getComments?
        this.props.setSelectionLoc(null);
      },
      error: (err) => {
        console.log('error posting entry:', err);
        // this.props.postEntryError(err);
      }
    })
  }

  cancelEntry () {
    this.setState({commentInput: '', activeCommentStatus: false, commentEntryHeight: 50, selectionLoc: null});
    this.props.handleCommentInput('');
    this.props.activeCommentStatus(false);
    this.props.updateCommentHeight(50);
    this.props.setSelectionLoc(null);
  }

  render() {
    return (
      <div className="entry-links-container">
        <a className="entry-link-post" onClick={() => this.props.postEntry()}>post</a>
        <a className="entry-link-cancel" onClick={() => this.props.cancelEntry()}>cancel</a>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectionLoc: state.selectionLoc,
    commentInput: state.commentInput,
    curUser: state.curUser,
    curDoc: state.curDoc
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postEntry: commentActions.postEntry,
    cancelEntry: commentActions.cancelEntry,
    setSelectionLoc: commentActions.setSelectionLoc,
    handleCommentInput: commentActions.handleCommentInput,
    activeCommentStatus: commentActions.activeCommentStatus,
    updateCommentHeight: commentActions.updateCommentHeight
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEntryLinks);
