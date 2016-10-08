import React from 'react';
import {render} from 'react-dom';
import {bindActionCreators} from 'redux';
import CommentArea from '../components/CommentArea.jsx';
import * as commentActions from '../actions/commentActions.jsx';
import SavedComment from './SavedCommentContainer.jsx';
import NewComment from './NewCommentContainer.jsx';

class CommentAreaContainer extends React.Component {
  componentWillMount() {
    this.props.getComments();
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
      <div className="comment-area-container">
        {
          this.renderComments();

          if (props.selectionLoc !== null) {
            this.renderNewComment();
          }
        }
      </div>;
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
    getComments: commentActions.getComments,
    addComment: commentActions.addComment,
    postEntry: commentActions.postEntry,
    cancelEntry: commentActions.cancelEntry,
    handleCommentClick: commentActions.handleCommentClick
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentAreaContainer);







// export default connect((store) => {
//   console.log('string', store.comment);
//   return {
//     comments: store.comments.comments
//   }
// })(CommentAreaContainer);



