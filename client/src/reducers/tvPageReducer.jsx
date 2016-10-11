const initialState = {
  curUser: null,
  curDoc: null,
  curSharedUsers: []
}

export default function (state=initialState, action) {
  switch (action.type) {

    case 'SET_DOC_ID':
      return Object.assign({}, state, {
        curDoc: action.docId
      })
    case 'SET_CUR_SHARED_USERS':
      return Object.assign({}, state, {
        curSharedUsers: action.users
      })
    default:
      return state
  }
}