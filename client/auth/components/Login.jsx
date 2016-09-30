import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActionCreators from '../actions/signupActions.jsx'; 
// import * as loginActionCreators from '../../src/actions/index.jsx'; 

class Login extends React.Component {
	constructor(props) {
		super(props)
	}

	login() {
	   // this.props.loginActions.login(username, password)
	}

	render() {

		return (
			<p>Hello this is Login</p>
		)
	}


}


const mapDispatchToProps = (dispatch) => {
	loginActions : bindActionCreators(loginActionCreators, dispatch) 
}


export default connect(
	null, 
	mapDispatchToProps)(Login);
