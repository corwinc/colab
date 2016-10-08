// DEMO
export function addComment(comment) {
  return {
    type: 'ADD_COMMENT',
    comment
  }
}

// REAL METHODS
export function getComments() {
  return {
    type: 'GET_COMMENTS'
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

export function postEntry(entry) {
  return {
    type: 'POST_ENTRY',
    entry
  }
}

export function cancelEntry() {
  return {
    type: 'CANCEL_ENTRY'
  }
}

export function handleCommentClick() {
  return {
    type: 'HANDLE_COMMENT_CLICK'
  }
}

