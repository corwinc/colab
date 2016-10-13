// FOR DEMO
// const initialState = {
//   comment: 'initialComment',
//   comments: ['initialComments1', 'initialComments2']
// }

// WHAT BELONGS TO LARGER APP (TAKE THESE OUT);
const initialState = {
  curUser: null,
  curDoc: null,
  comments: [],
  commentInput: '',
  activeCommentStatus: false,
  commentEntryHeight: 50,
  savedSelectionLoc: null,
  newCommentStatus: false,
  savedCommentFocus: true
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
    case 'HANDLE_COMMENT_HEIGHT_AFTER_INPUT':
      return Object.assign({}, state, {
        commentEntryHeight: action.height
      })
    case 'SET_NEW_COMMENT_STATUS':
      return Object.assign({}, state, {
        newCommentStatus: action.status
      })
    case 'SET_FOCUS':
      return Object.assign({}, state, {
        savedCommentFocus: action.bool
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

