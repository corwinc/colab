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
				const token = res.data.username;
				const username = res.data.username;
				localStorage.setItem('userToken', token);
				localStorage.setItem('user', JSON.stringify(username));
      	// browserHistory.push('/documentlist');
				dispatch(userSignupSuccess(userData)); 
			}
		})
		.catch((err) => {
			dispatch(userSignupFailure(err));
		});
	}
} 