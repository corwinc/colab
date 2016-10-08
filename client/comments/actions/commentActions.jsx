// DEMO
export function addComment(comment) {
  return {
    type: 'ADD_COMMENT',
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

export function setSelectionLoc(loc) {
  return {
    type: 'SET_SELECTION_LOC',
    loc
  }
}

export function handleCommentInput(input) {
  return {
    type: 'HANDLE_COMMENT_INPUT',
    input
  }
}

export function updateCommentHeight(height) {
  type: 'UPDATE_COMMENT_HEIGHT',
  height
}

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

