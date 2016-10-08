import React from 'react';
import {connect} from 'react-redux';
import * as commentActions from '../actions/commentActions.jsx';

class CommentList extends React.Component {
  componentDidMount() {
    this.props.dispatch(commentActions.addComment('adding a comment!'));
    console.log(commentActions.addComment);
  }

  render() {
    return (
      <div>
        {this.props.comment}
      </div>
    )
  }
}

export default connect((store) => {
  console.log('string', store.comment);
  return {
    comment: store.comment.comment
  }
})(CommentList);

