const initialState = {
  curSharedUsers: []
}

export default function (state=initialState, action) {
  switch (action.type) {
    case 'SET_CUR_SHARED_USERS':
      return Object.assign({}, state, {
        curSharedUsers: action.users
      })
    default:
      return state
  }
}
