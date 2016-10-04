import React from 'react';
import LoginForm from './loginForm.jsx';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import {userLoginRequest} from '../actions/loginAction.jsx'; 
// import * as loginActionCreators from '../../src/actions/index.jsx'; 

class Login extends React.Component {
	constructor(props) {
		super(props)
	}

	// login() {
	//    // this.props.loginActions.login(username, password)
	// }

	render() {
		const {userLoginRequest} = this.props;
		return (
			<div className="row">
		        <div className="col-md-4 col-md-offset-4">
		    		<LoginForm userLoginRequest={userLoginRequest}/> 
		        </div>
	        </div>
		)
	}


}


// const mapDispatchToProps = (dispatch) => {
// 	loginActions : bindActionCreators(loginActionCreators, dispatch) 
// }

Login.propTypes = {

	userLoginRequest: React.PropTypes.func.isRequired 
}

export default connect(
	null, 
	{userLoginRequest})(Login);
