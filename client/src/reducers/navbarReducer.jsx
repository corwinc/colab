const initialState = {
  userId: null
}

export default function (state=initialState, action) {
  switch (action.type) {

    case 'SET_USER_ID':
      return Object.assign({}, state, {
        userId: action.userId
      })
    default:
      return state
  }
}
