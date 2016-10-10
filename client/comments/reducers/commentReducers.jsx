// FOR DEMO
// const initialState = {
//   comment: 'initialComment',
//   comments: ['initialComments1', 'initialComments2']
// }

// WHAT BELONGS TO LARGER APP (TAKE THESE OUT);
const initialState = {
  curUser: null,
  curDoc: 2,
  comments: [],
  commentInput: '',
  activeCommentStatus: false,
  commentEntryHeight: 50,
  selectionLoc: 180
}

export default function (state=initialState, action) {
  switch (action.type) {

    // DEMOS
    // UPDATING SINGLE STATE
    case 'ADD_COMMENT': // DEMO
      return Object.assign({}, state, {
        comment: action.comment
      })
    // DEALING WITH ARRAY
    case 'ADD_COMMENT_TO_COMMENTS': // DEMO
    return Object.assign({}, state, {
      comments: [
        ...state.comments,
        action.comment
      ]
    })

    // REDUCERS
    case 'GET_COMMENTS_SUCCESS':
      return Object.assign({}, state, {
        comments: action.comments
      })
    case 'SET_SELECTION_LOC':
     return Object.assign({}, state, {
        selectionLoc: action.loc
     })
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
    case 'POST_ENTRY':
      return Object.assign({}, state, {
        comment: action.postEntry
      })
    case 'CANCEL_ENTRY':
      return state
    case 'HANDLE_COMMENT_CLICK':
      return state
    default:
      return state
  }
}

