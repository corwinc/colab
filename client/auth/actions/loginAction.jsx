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
		return axios.get('/users?username=' + userData.username + '&password=' + userData.password)
		.then((res) => {
			// const token = res.data.token;
			// localStorage.setItem('jstToken', token);
			
			if (res.data === 'User not found.') {
				console.log('response inside user not found action', res.data);

				dispatch(userLoginFailure(res.data));
				return res.data;

			} else {
				dispatch(userLoginSuccess(userData)); 
				console.log('userData....', userData);
				return userData;
			}
				
		})
		.catch((err) => {
			dispatch(userLoginFailure(err));
		});
	}
} 