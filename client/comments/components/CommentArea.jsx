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
    this.renderComments = this.renderComments.bind(this);
    this.renderNewComment = this.renderNewComment.bind(this);
  }

  componentWillMount() {
    // this.getComments();
  }

  getComments () {
    console.log('inside CommentArea getComments, current props:', this.props);
    $.ajax({
      method: 'GET',
      url: '/comments',
      dataType: 'json',
      data: {docId: this.props.curDoc},
      success: (data) => {
        console.log('Success getting comments!:', data);
        this.props.getCommentsSuccess(data); // reducer should update state w/ this once hooked up
      },
      error: (err) => {
        console.log('error getting comments:', err);
      }
    })
  }

  renderComments() {
    console.log('inside renderComments');
    console.log('renderComments current props:', this.props);
    return this.props.comments.map((comment, i) => {
              return (
                <SavedComment key={i} comment={comment} />
              );
            });
  }

  renderNewComment() {
    console.log('inside renderNewComment');
    // return <NewComment />;
  }

  render() {
    return (
      <div className="comment-area-container">hello!
        {
          (() => {
            this.renderComments();

            if (this.props.selectionLoc !== null) {
              this.renderNewComment();
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
