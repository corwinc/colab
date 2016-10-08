import React from 'react';
import {render} from 'react-dom';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';
import SavedComment from './SavedComment.jsx';
import NewComment from './NewComment.jsx';
import {connect} from 'react-redux';

class CommentArea extends React.Component {
  componentWillMount() {
    // this.getComments();

  }

  getComments () {
    console.log('inside getComments');
    $.ajax({
      method: 'GET',
      url: '/comments',
      dataType: 'json',
      data: {docId: this.state.curDoc},
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
    return this.props.comments.map((comment, i) => {
              return (
                <SavedComment key={i} comment={comment} />
              );
            });
  }

  renderNewComment() {
    return <NewComment />;
  }

  render() {
    return (
      <div className="comment-area-container">hello!
        {
          (() => {
            // this.renderComments();

            // if (props.selectionLoc !== null) {
            //   this.renderNewComment();
            // }
          })()
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCommentsSuccess: commentActions.getCommentsSuccess,
    getCommentsError: commentActions.getCommentsError
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentArea);
