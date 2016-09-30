import React from 'react';
import SignupForm from './signupForm.jsx';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as loginActionCreators from '../../src/actions/index.jsx'; 

export default class Signup extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {

		return (
		  
		  <div className="row">
        <div className="col-md-4 col-md-offset-4">
    			<SignupForm /> 
        </div>
      </div>
			
		)
	}


}

