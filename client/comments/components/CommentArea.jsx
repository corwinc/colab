import React from 'react';
import {render} from 'react-dom';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';
import SavedComment from './SavedComment.jsx';
import NewComment from './NewComment.jsx';
import TextSelectionMenu from './TextSelectionMenu.jsx';
import {connect} from 'react-redux';
import axios from 'axios';

class CommentArea extends React.Component {
  constructor(props) {
    super(props);

    this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    this.getComments();
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

  deleteComment(id) {
    axios.delete('/comments?id=' + id)
      .then((res) => {
        this.getComments();
      })
      .catch((err) => {
        console.log('Error deleting comment:', err);
      })

  }

  render() {
    return (
      <div className="comment-area-container">
        {
          // Render all saved comments
          (() => {
            return this.props.comments.map((comment, i) => {
              return (<SavedComment key={i} comment={comment} deleteComment={this.deleteComment} />);
            });
          })()
        }

        {
          // If text is selected and a NewComment component is not rendered, show menu (currently only shows comment icon)
          (() => {
            if (this.props.selectionLoc !== null && !this.props.newCommentStatus) {
              return (<TextSelectionMenu />);
            }
          })()
        }

        {
          // If comment icon has been selected (and therefor newCommentStatus == true), render NewComment
          (() => {
            if (this.props.newCommentStatus) {
              return (<NewComment />);
            }
          })()
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comment.comments,
    selectionLoc: state.editor.selectionLoc,
    curDoc: state.editor.docId,
    newCommentStatus: state.comment.newCommentStatus
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCommentsSuccess: commentActions.getCommentsSuccess,
    getCommentsError: commentActions.getCommentsError
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentArea);
