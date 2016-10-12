const initialState = {
  curUser: null,
  curDoc: null
}

export default function (state=initialState, action) {
  switch (action.type) {

    case 'SET_DOC_ID':
      return Object.assign({}, state, {
        curDoc: action.docId
      })
    default:
      return state
  }
}