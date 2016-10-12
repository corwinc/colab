import React from 'react';
import {render} from 'react-dom';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';
import SavedComment from './SavedComment.jsx';
import NewComment from './NewComment.jsx';
import TextSelectionMenu from './TextSelectionMenu.jsx';
import {connect} from 'react-redux';

class CommentArea extends React.Component {
  constructor(props) {
    super(props);

    this.getComments = this.getComments.bind(this);
  }

  componentDidMount() {
    console.log('COMMENT CURDOC:', this.props.curDoc);
    this.getComments();
  }

  getComments () {
    $.ajax({
      method: 'GET',
      url: '/comments',
      dataType: 'json',
      data: {docId: this.props.curDoc},
      success: (data) => {
        console.log('COMMENT Success getting comments!:', data);
        this.props.getCommentsSuccess(data); // reducer should update state w/ this once hooked up
      },
      error: (err) => {
        console.log('COMMENT error getting comments:', err);
      }
    })
  }

  render() {
    return (
      <div className="comment-area-container">
        {
          (() => {
            return this.props.comments.map((comment, i) => {
              return (<SavedComment key={i} comment={comment} />);
            });
          })()
        }

        {
          (() => {
            if (this.props.selectionLoc !== null) {
              return (<TextSelectionMenu />);
            }
          })()
        }

        {
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

// 1st 'comment' = root reducer, 2nd is props
function mapStateToProps(state) {
  return {
    comments: state.comment.comments,
    selectionLoc: state.editor.selectionLoc,
    curDoc: state.comment.curDoc,
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
