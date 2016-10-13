const initialState = {
  curUser: null,
  curDoc: null,
  comments: [],
  commentInput: '',
  activeCommentStatus: false,
  commentEntryHeight: 50,
  savedSelectionLoc: null,
  newCommentStatus: false
}

export default function (state=initialState, action) {
  switch (action.type) {
    
    /* SAVED COMMENTS */
    case 'GET_COMMENTS_SUCCESS':
      return Object.assign({}, state, {
        comments: action.comments
      })

    /* NEW COMMENTS */
    case 'HANDLE_COMMENT_INPUT':
      return Object.assign({}, state, {
        commentInput: action.input
      })
    case 'ACTIVE_COMMENT_STATUS':
      return Object.assign({}, state, {
        activeCommentStatus: action.bool
      })
    case 'UPDATE_COMMENT_HEIGHT':
      return Object.assign({}, state, {
        commentEntryHeight: action.height
      })
    case 'SET_NEW_COMMENT_STATUS':
      return Object.assign({}, state, {
        newCommentStatus: action.status
      })
    default:
      return state
  }
}

