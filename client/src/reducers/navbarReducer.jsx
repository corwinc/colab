const initialState = {

}

export default function (state=initialState, action) {
  switch (action.type) {

    case 'GET_COMMENTS_SUCCESS':
      return Object.assign({}, state, {
        comments: action.comments
      })
    default:
      return state
  }
}
