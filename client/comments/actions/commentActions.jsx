import thunk from 'redux-thunk';
import promise from 'redux-promise';

// DEMO
export function addComment(comment) {
  return {
    type: 'ADD_COMMENT',
    comment
  }
}

export function addCommentToComments(comment) {
  return {
    type: 'ADD_COMMENT_TO_COMMENTS',
    comment
  }
}

// ADD COMMENTS TO STATE ON GETCOMMENTS SUCCESS

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

export function handleCommentInput(input) {
  console.log('INSIDE HANDLE COMMENT INPUT');
  return {
    type: 'HANDLE_COMMENT_INPUT',
    input
  }
}

export function updateCommentHeight(height) {
  console.log('INSIDE UPDATE COMMENT HEIGHT');
  return {
    type: 'UPDATE_COMMENT_HEIGHT',
    height
  }
}



//////// NEW

export function handleCommentInputThenHeight(input) {
  console.log('INSIDE ACTION HANDLE INPUT THEN HEIGHT, input:', input);
  return dispatch => {
    console.log('INSIDE INNER DISPATCH ABOUT TO D HANDLECOMMENTINPUTP, input:', input);
     dispatch(handleCommentInputP(input))
      .then((inputRes) => dispatch(updateCommentHeightAfterInput(inputRes)))
  }
}

export function handleCommentInputP(input) {
  console.log('INSIDE HANDLE COMMENT INPUT P, input:', input);
  return new Promise(() => handleCommentInput);
}

export function updateCommentHeightAfterInput(input) {
  console.log('INSIDE UPDATE HEIGHT AFTER INPUT: input:', input);
  if (input !== '') {
    return {
      type: 'UPDATE_COMMENT_HEIGHT_AFTER_INPUT',
      height: 70
    } 
  } else {
    return {
      type: 'UPDATE_COMMENT_HEIGHT_AFTER_INPUT',
      height: 50
    }
  }
}


///

export function activeCommentStatus(bool) {
  return {
    type:'ACTIVE_COMMENT_STATUS',
    bool
  }
}

export function postEntry(entry) {
  return {
    type: 'POST_ENTRY',
    entry
  }
}

export function postEntrySuccess(data) {
  return {
    type: 'POST_ENTRY_SUCCESS',
    data
  }
}

export function postEntryError(err) {
  return {
    type: 'POST_ENTRY_ERROR',
    err
  }
}

export function cancelEntry() {
  return {
    type: 'CANCEL_ENTRY'
  }
}

// in reducer: toggle commentclick & if true, turn off all others
export function handleCommentClick() {
  return {
    type: 'HANDLE_COMMENT_CLICK'
  }
}

export function setNewCommentStatus(status) {
  return {
    type: 'SET_NEW_COMMENT_STATUS',
    status
  }
}

