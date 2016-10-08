const initialState = {
	username: 'b',
	// documents: [],
	// inputValue: '',
	message: 'test'
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

  	default:
  	  return state;
  }
}