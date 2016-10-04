import axios from 'axios'

export function userSignupSuccess(userInfo) {
	return {
		type : "AUTH_SUCCESS",
		userInfo,
	}
}

export function userSignupRequest(userData) {
	return (dispatch) => {
		return axios.post('/users', userData)
		.then(() => {
			dispatch(userSignupSuccess(userData)); 
			console.log('promsie resolved');
		})
		.catch((err) => {
			console.log('the error', err)
		});
	}
} 