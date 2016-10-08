import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';

class CommentDemo extends React.Component {

  render() {
    const {comment} = this.props;
    console.log('inside render', comment);
    return (
      <div>
        {console.log(this.props)}

        {comment.comment}
        {comment.comments}
        <div>
          <a onClick={() => this.props.addCommentToComments('heyo')}>click me to add to comments</a>
        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    comment: state.comment,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addComment: commentActions.addComment,
    addCommentToComments: commentActions.addCommentToComments
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentDemo);


// export default connect((store) => {
//   console.log('string', store.comment);
//   return {
//     comment: store.comment.comment
//   }
// })(CommentList);



        // {this.props.comments.comment}
