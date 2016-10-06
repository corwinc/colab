import axios from 'axios'

export function userSignupSuccess(userInfo) {
	return {
		type : "AUTH_SUCCESS",
		userInfo,
	}
}

export function userSignupFailure(err) {
	return {
		type: "AUTH_FAILURE", 
		err, 
	}
}

export function userSignupRequest(userData) {
	return (dispatch) => {
		return axios.post('/users', userData)
		.then((res) => {
			if (res.data === "A user with that username already exists.") {
				dispatch(userSignupFailure(res.data));
				console.log('inside if ', res.data);
				return res.data;
			} else {
				dispatch(userSignupSuccess(userData)); 
				console.log('inside else ', res.data);

			}
		})
		.catch((err) => {
			dispatch(userSignupFailure(err));
		});
	}
} 