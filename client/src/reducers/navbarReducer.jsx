const initialState = {
  userId: null,
  curSharedUsers: []
}

export default function (state=initialState, action) {
  switch (action.type) {
    case 'SET_USER_ID':
      return Object.assign({}, state, {
        userId: action.userId
      })
    case 'SET_CUR_SHARED_USERS':
      return Object.assign({}, state, {
        curSharedUsers: action.users
      })
    default:
      return state
  }
}
