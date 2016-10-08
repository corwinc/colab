const initialState = {
  comment: ['hey']
}

export default function (state=initialState, action) {
  switch (action.type) {
    case 'ADD_COMMENT': // DEMO
      return Object.assign({}, state, {
        comment: action.comment
      })
    case 'GET_COMMENTS':
      return // something
    case 'GET_COMMENTS_SUCCESS':
      //need to handle array of data
      console.log('Success getting comments!! Fill out reducer now');
    case 'SET_SELECTION_LOC':
     return // something
    case 'HANDLE_COMMENT_INPUT':
      return Object.assign({}, state, {
        commentInput: action.commentInput
      })
    case 'POST_ENTRY':
      return Object.assign({}, state, {
        comment: action.postEntry
      })
    case 'CANCEL_ENTRY':
      return // something
    case 'HANDLE_COMMENT_CLICK':
      return // something
    default:
      return state
  }
}