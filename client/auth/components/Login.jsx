import React from 'react';
import LoginForm from './loginForm.jsx';
import { connect } from 'react-redux';
import {userLoginRequest} from '../actions/loginAction.jsx'; 

class Login extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {userLoginRequest} = this.props;
		return (
			<div>


					<div className="container">
						<div className="row">
			        <div className="col-md-4 col-md-offset-4">
			    		<LoginForm userLoginRequest={userLoginRequest}/> 
			        </div>
		        </div>
		    </div>
	    </div>
		)
	}
}

Login.propTypes = {
	userLoginRequest: React.PropTypes.func.isRequired 
}

export default connect(
	null, 
	{userLoginRequest})(Login);
