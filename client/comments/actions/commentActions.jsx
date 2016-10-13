import thunk from 'redux-thunk';
import promise from 'redux-promise';

/* SAVED COMMENTS */ 
export function getComments() {
  return {
    type: 'GET_COMMENTS'
  }
}

export function getCommentsSuccess(comments) {
  return {
    type: 'GET_COMMENTS_SUCCESS',
    comments
  }
}

export function getCommentsError(error) {
  return {
    type: 'GET_COMMENTS_ERROR',
    error
  }
}


/* NEW COMMENTS */
export function handleCommentInput(input) {
  console.log('HANDLE COMMENT handleCommentInput, input:', input);
  return {
    type: 'HANDLE_COMMENT_INPUT',
    input
  }
}

export function updateCommentHeight(height) {
  console.log('HANDLE COMMENT updateCommentHeight, height:', height);
  return {
    type: 'UPDATE_COMMENT_HEIGHT',
    height
  }
}

export function activeCommentStatus(bool) {
  console.log('HANDLE COMMENT activeCommentStatus, bool:', bool);
  return {
    type:'ACTIVE_COMMENT_STATUS',
    bool
  }
}

// Keep track of new comment status in order to hide newComment after post / cancel
export function setNewCommentStatus(status) {
  return {
    type: 'SET_NEW_COMMENT_STATUS',
    status
  }
}

