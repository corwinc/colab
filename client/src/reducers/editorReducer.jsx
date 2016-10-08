const initialState = {
  quill: null,
  saveInterval: null,
  sharelinkId: '',
  user: null
}

export default function(state = initialState, action) {
	switch(action.type) {
		case 'SET_QUILL': {
			return Object.assign({}, state, {
				quill: action.quill 
			});
		}
		case 'SET_INTERVAL': {
			return Object.assign({}, state, {
				saveInterval: action.saveInterval
			});
		}
		case 'SET_LINK': {
			return Object.assign({}, state, {
				sharelinkId: action.sharelinkId
			});
		}
		case 'SET_USER': {
			return Object.assign({}, state, {
				user: action.user
			});
		}
		default:
		  return state;
	}
}
