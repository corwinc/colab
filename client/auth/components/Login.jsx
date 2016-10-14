import React from 'react';
import LoginForm from './loginForm.jsx';
import { connect } from 'react-redux';
import {userLoginRequest} from '../actions/loginAction.jsx'; 

class Login extends React.Component {
	constructor(props) {
		super(props)
	}



	render() {
		var imgUrl = '../../../public/media/3.jpg'

		var divStyle = {
		  color: 'white',
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
