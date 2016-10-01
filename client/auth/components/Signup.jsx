import React from 'react';
import SignupForm from './signupForm.jsx';
import { connect } from 'react-redux';
import {userSignupRequest} from '../actions/signupActions.jsx';
// import { bindActionCreators } from 'redux';
// import * as loginActionCreators from '../../src/actions/index.jsx'; 

class Signup extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {userSignupRequest} = this.props;
		return (
		  
		  <div className="row">
	        <div className="col-md-4 col-md-offset-4">
	    		<SignupForm userSignupRequest={userSignupRequest}/> 
	        </div>
	      </div>
			
		)
	}
}

Signup.propTypes = {

	userSignupRequest: React.PropTypes.func.isRequired 
}

export default connect(null, {userSignupRequest})(Signup);

