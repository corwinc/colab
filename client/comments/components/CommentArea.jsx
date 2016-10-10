import React from 'react';
import {render} from 'react-dom';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';
import SavedComment from './SavedComment.jsx';
import NewComment from './NewComment.jsx';
import {connect} from 'react-redux';

class CommentArea extends React.Component {
  constructor(props) {
    super(props);

    this.getComments = this.getComments.bind(this);
    // this.renderComments = this.renderComments.bind(this);
    // this.renderNewComment = this.renderNewComment.bind(this);
  }

  componentWillMount() {
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

  // renderComments() {
  //   console.log('COMMENT inside renderComments');
  //   console.log('COMMENT renderComments current props:', this.props);
  //   return this.props.comments.map((comment, i) => {
  //             return (
  //               <SavedComment key={i} comment={comment} />
  //             );
  //           });
  // }

  // renderNewComment() {
  //   console.log('COMMENT inside renderNewComment');
  //   // return <NewComment />;
  // }

  render() {
    return (
      <div className="comment-area-container">
        {
          // (() => {
          //   this.renderComments();

          //   if (this.props.selectionLoc !== null) {
          //     this.renderNewComment();
          //   }
          // })()
        }
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
    selectionLoc: state.comment.selectionLoc,
    curDoc: state.comment.curDoc
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCommentsSuccess: commentActions.getCommentsSuccess,
    getCommentsError: commentActions.getCommentsError
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentArea);
