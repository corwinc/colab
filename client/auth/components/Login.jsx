import React from 'react';
import LoginForm from './loginForm.jsx';
import { connect } from 'react-redux';
import {userLoginRequest} from '../actions/loginAction.jsx'; 

class Login extends React.Component {
	constructor(props) {
		super(props)
	}



	render() {
		var imgUrl = 'https://c2.staticflickr.com/2/1463/25664074173_3e98714146_o.jpg'

		var divStyle = {
		  position: 'fixed',
		  top:0,
		  bottom: 0,
		  left: 0,
		  width:'100%',
		  backgroundImage: 'url(' + imgUrl + ')',
		  WebkitTransition: 'all', // note the capital 'W' here
		  msTransition: 'all', // 'ms' is the only lowercase vendor prefix
		  backgroundSize: 'cover',
          overflow: 'hidden',
		};
		const {userLoginRequest} = this.props;

		return (
			<div style={divStyle}>
			  <div className="container">
					<div class="row main">
					  <div class="panel-heading">
	            <div class="panel-title text-center">
             	  <h1 class="title">Colab</h1>
             	  <hr />
	            </div>
			      </div> 
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
