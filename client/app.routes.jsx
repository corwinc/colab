import React from 'react';
import {Route, Router, browserHistory, IndexRoute } from 'react-router';
import App from './app.jsx';
import Login from './auth/components/Login.jsx';
import Signup from './auth/components/Signup.jsx';
import TextEditor from './src/components/textEditor.jsx';
import Chat from './src/components/chat.jsx';
//import AppVideo from './src/components/video.jsx';
import TextVideoPage from './src/components/textVideoPage.jsx';
import DocumentList from './src/components/documentList.jsx';


const requireAuth = (nextState, replace) => {
  const token = localStorage.getItem('userToken');
  if (!token) {
    replace({
      pathname: '/login',
    });
  }
};

const logout = (nextState, replace) => {
	console.log('inside logout in route.jsx')
  localStorage.removeItem('userToken');
  localStorage.removeItem('user');
  replace({ pathname: '/login' });
};

module.exports = (

	<Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
		<Route path="/" component={App} onEnter={requireAuth}>
			<IndexRoute 
				component={TextVideoPage}
			/>
			<Route path='/documentList' component={DocumentList}
			onEnter={requireAuth} />
		</Route>
		<Route path='/login' component={Login} />
		<Route path="/logout" onEnter={logout} />
		<Route path='/signup' component={Signup} />
	</Router> 
)
