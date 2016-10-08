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
				console.log('response inside user not found action', res.data);

				dispatch(userLoginFailure(res.data));
				return res.data;

			} else {
				console.log('res.data.user', res.data.username);
				const token = res.data.username;
				const username = res.data.username;
				localStorage.setItem('userToken', token);
				localStorage.setItem('user', JSON.stringify(username));
      			browserHistory.push('/');
				dispatch(userLoginSuccess(username)); 
				console.log('userData....', username);
				return username;
			}
				
		})
		.catch((err) => {
			dispatch(userLoginFailure(err));
		});
	}
} 