const initialState = {
  quill: null,
  saveInterval: null,
  sharelinkId: null,
  user: null
}

export default function(state = initialState, action) {
	switch(action.type) {
		case 'SET_QUILL': {
			state = Object.assign({}, state, {
				quill: action.payload // may need to change to action.quill
			});
			// state = {...state, quill: action.payload};
      // state.quill = action.payload;
			break;
		}
		case 'SET_INTERVAL': {
			state = Object.assign({}, state, {
				saveInterval: action.payload
			});
			break;
		}
		case 'SET_LINK': {
			state = Object.assign({}, state, {
				sharelinkId: action.payload
			});
			break;
		}
		case 'SET_USER': {
			state = Object.assign({}, state, {
				user: action.payload
			});
			break;
		}
		default:
		  return state;
	}
}
