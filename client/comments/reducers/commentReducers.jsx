const initialState = {
  comment: 'initialComment',
  comments: ['initialComments1', 'initialComments2']
}

export default function (state=initialState, action) {
  switch (action.type) {
    // DEMO FOR UPDATING SINGLE STATE
    case 'ADD_COMMENT': // DEMO
      return Object.assign({}, state, {
        comment: action.comment
      })
    // DEMO FOR DEALING WITH ARRAY
    case 'ADD_COMMENT_TO_COMMENTS': // DEMO
    return Object.assign({}, state, {
      comments: [
        ...state.comments,
        action.comment
      ]
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


// E.G. UPDATING SINGLE STATE
// case 'AUTH_SUCCESS':
//   return Object.assign({}, state, {
//     username : action.username
//   });

// E.G. ADDING ITEM TO ARRAY
