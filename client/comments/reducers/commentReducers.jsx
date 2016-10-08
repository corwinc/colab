const initialState = {
  comment: ['hey']
}

export default function (state=initialState, action) {
  switch (action.type) {
    // post input to db
    case 'ADD_COMMENT':
      return Object.assign({}, state, {
        comment: action.comment
      })
    case 'POST_ENTRY':
      return Object.assign({}, state, {
        comment: action.postEntry
      })
    // Update input state
    case 'HANDLE_COMMENT_INPUT':
      return Object.assign({}, state, {
        commentInput: action.commentInput
      })
    default:
      return state
  }
}