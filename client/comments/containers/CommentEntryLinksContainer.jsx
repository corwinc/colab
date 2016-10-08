import React from 'react';
import {render} from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';

class CommentEntryLinks extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="entry-links-container">
        <a className="entry-link-post" onClick={() => this.props.postEntry()}>post</a>
        <a className="entry-link-cancel" onClick={() => this.props.cancelEntry()}>cancel</a>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     selectionLoc: state.selectionLoc,
//     commentInput: state.commentInput
//   }
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postEntry: commentActions.postEntry,
    cancelEntry: commentActions.cancelEntry
  }, dispatch);
}

export default connect(mapDispatchToProps)(CommentEntryLinks);
