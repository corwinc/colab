import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';

var initials = 'CC';

class SavedComment extends React.Component {

  setBorder() {
    console.log('setting a border');
  }

  render() {
    return (
      <div className="comment-saved-container">
        <div className="comment-saved" style={{top: this.props.comment.location - 56, border: this.setBorder()}}>
          <div className="comment-saved-chathead" onClick={() => this.props.handleCommentClick()}>
            <span className="comment-saved-initials">{this.props.comment.initials}</span>
          </div>
          <div className="comment-saved-text">{this.props.comment.text}</div>
        </div>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     selectionLoc: state.editor.selectionLoc,
//     commentInput: state.comment.commentInput,
//     commentEntryHeight: state.comment.commentEntryHeight,
//     activeComment: state.comment.activeCommentStatus,
//     curUserInitials: state.tvPage.curUserInitials
//   }
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    handleCommentClick: commentActions.handleCommentClick
  }, dispatch);
}

export default connect(mapDispatchToProps)(SavedComment);