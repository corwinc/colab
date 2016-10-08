const initialState = {
	username: 'b',
	documents: [],
	inputValue: '',
	message: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
  	case 'SHOW_MESSAGE':
  	  return Object.assign({}, state, {
  	  	message: action.message
  	  });
  	case 'CLEAR_MESSAGE':
  	  return Object.assign({}, state, {
  	  	message: action.message
  	  });
    case 'POPULATE_DOCS':
      return Object.assign({}, state, {
        documents: action.documents
      });
    case 'SET_INPUTVALUE':
      return Object.assign({}, state, {
      	inputValue: action.inputValue
      });
  	default:
  	  return state;
  }
}
