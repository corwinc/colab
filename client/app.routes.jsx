import React from 'react';
import {Route, Router, browserHistory } from 'react-router';
import App from './app.jsx';
import Login from './auth/components/Login.jsx'
import Signup from './auth/components/Signup.jsx'


module.exports = (

	<Router history={browserHistory}>
		<Route path="/" component={App}>

		</Route>
		<Route path='/login' component={Login} />
		<Route path='/signup' component={Signup} />
	</Router> 
	)

