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
			if (res.data === 'User not found.') {

				dispatch(userLoginFailure(res.data));
				return res.data;

			} else {
				const token = res.data.username;
				const username = res.data.username;
				localStorage.setItem('userToken', token);
				localStorage.setItem('user', JSON.stringify(username));
				return username;
			}
				
		})
		.catch((err) => {
			dispatch(userLoginFailure(err));
		});
	}
} 

