import React from 'react';
import SignupForm from './signupForm.jsx';
import { connect } from 'react-redux';
import {userSignupRequest} from '../actions/signupActions.jsx';
import {addFlashMessage} from '../actions/addFlashMessages.jsx';

class Signup extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var imgUrl = '../../../public/media/bckgrnd.jpg'

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
		const {userSignupRequest, addFlashMessage} = this.props;
		return (
			<div style={divStyle}>
			  <div class="container">
			    <div class="row main">
					  <div class="panel-heading">
		          <div class="panel-title text-center">
		           	  <h1 class="title">Col-Lab</h1>
		           	  <hr />
		          </div>
		        </div> 
	          <div className="col-md-4 col-md-offset-4">
		    	    <SignupForm userSignupRequest={userSignupRequest} 
		    	    addFlashMessage={addFlashMessage}/> 
	          </div>
			    </div>
			  </div>
			</div>
		)
	}
}

Signup.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired, 
	addFlashMessage: React.PropTypes.func.isRequired 
}

export default connect(null, {userSignupRequest, addFlashMessage})(Signup);

