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
        console.log('userData ', userData);

		console.log("userData.username ",userData.username);
		console.log('hashed password', userData.password);
		return axios.get('/users?username=' + userData.username + '&password=' + userData.password)
		.then((res) => {
			console.log('res.data into loginAction----->', res);
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
      			//browserHistory.push('/documentlist');
				dispatch(userLoginSuccess(username)); 
				console.log('userData....', username);
				return username;
			}
				
		})
		.catch((err) => {
			console.log('inside loginAction error', err);
			dispatch(userLoginFailure(err));
		});
	}
} 