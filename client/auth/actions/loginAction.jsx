import axios from 'axios'

export function userLoginSuccess(userInfo) {
	return {
		type : "AUTH_SUCCESS",
		userInfo,
	};
}

export function userLoginFailure(err) {
	return {
		type: "AUTH_FAILURE", 
		err, 
	}
}

export function userLoginRequest(userData) {
	return (dispatch) => {
		return axios.post('/users', userData)
		.then(() => {
			dispatch(userLoginSuccess(userData)); 
			console.log('promsie resolved');
		})
		.catch((err) => {
			dispatch(userLoginFailure(err));
		});
	}
} 