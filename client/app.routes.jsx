import React from 'react';
import {Route, Router, browserHistory, IndexRoute } from 'react-router';
import App from './app.jsx';
import Login from './auth/components/Login.jsx';
import Signup from './auth/components/Signup.jsx';
import TextEditor from './src/components/textEditor.jsx';
import Chat from './src/components/chat.jsx';
import AppVideo from './src/components/video.jsx';



module.exports = (

	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute 
				component={TextEditor}
			/>
		</Route>
		<Route path='/login' component={Login} />
		<Route path='/signup' component={Signup} />
	</Router> 
	)

