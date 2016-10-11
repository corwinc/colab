const initialState = {
  curUser: null,
  curDoc: null,
  curSharedUsers: [],
  curUserInitials: ''
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
    case 'SET_CUR_USER_INITIALS':
      return Object.assign({}, state, {
        curUserInitials: action.initials
      })
    default:
      return state
  }
}