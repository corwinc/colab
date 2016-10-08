// import {SHOW_MESSAGE} from '../types.jsx';

export function showMessage(message) {
	return {
		type: 'SHOW_MESSAGE',
		// message
		message: message
	}
}

export function clearMessage() {
	return {
		type: 'CLEAR_MESSAGE',
		message: ''
	}
}

// export function show(message) {
// 	return (dispatch) => {
// 		dispatch(showMessage(message));
// 	}
// }

// export function clear(message) {
// 	return (dispatch) => {
// 		dispatch(clearMessage(message));
// 	}
// }