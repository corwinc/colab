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
            console.log('CURRENT SELECTION IS:', this.props.selectionLoc);
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
    selectionLoc: state.editor.selectionLoc,
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
