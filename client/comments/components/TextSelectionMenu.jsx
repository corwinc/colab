import React from 'react';
import {render} from 'react-dom';
import {bindActionCreators} from 'redux';
import * as commentActions from '../actions/commentActions.jsx';
import {connect} from 'react-redux';

class TextSelectionMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="text-selection-menu-container">
        <img 
          src="../../public/images/comment.png" 
          className="comment-icon" 
          style={{top: this.props.selectionLoc - 30}}
          onClick={() => (this.props.setNewCommentStatus(true))}>
        </img>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectionLoc: state.editor.selectionLoc
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setNewCommentStatus: commentActions.setNewCommentStatus,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TextSelectionMenu);
