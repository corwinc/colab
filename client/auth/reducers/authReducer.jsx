const initialState = {
	username: '',
	statusmessage: '',
}


export default function(state = initialState, action) {
	switch (action.type) {
		case 'AUTH_SUCCESS':
			return Object.assign({}, state, {
				username : action.username
			});
		case 'AUTH_FAILURE' :
			return Object.assign({}, state, {
				statusmessage: action.err,
			});
		default : 
			return state; 
	}
}