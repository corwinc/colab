import React from 'react';
import {Link} from 'react-router';


class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username:'',
			password:'',
			usernameMsg:'',
			passwordMsg: '',
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.userLoginRequest(this.state).then(
			(res) => {
			console.log('response inside login redirect', res);

				if (res !== 'User not found.') {
					console.log('inside redirecting to documentlist----------->');
				 this.context.router.push('/documentlist');
				} else {
					console.log('inside error seting state.');
					this.setState({usernameMsg: 'user not found',passwordMsg: 'wrong password' });	
					console.log(this.state.usernameMsg);
				}
			}
		);
	}

	render() {
		var errStyle = {
			color: 'red'
		}
		var titleStyle = {
	      color: '#3666b5'
	    };
		return (
			<div className="main-login main-center"> 
				<form className="form-horizontal" 
					onSubmit={this.onSubmit}
					>

					<div className="form-group1">
						<label 
							className="cols-sm-2 control-label">Username</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon">
									<i className="fa fa-users fa" 
										aria-hidden="true">
									</i></span>
								<input 
									value={this.state.username}
									onChange={this.onChange}
									type="text"
									name="username"
									placeholder="username"
									className="form-control" required
								/>
							</div>
							<span style={errStyle}>{this.state.usernameMsg}</span>
						</div>
					</div>
					
					<div className="form-group1">
						<label 
							className="cols-sm-2 control-label">Password</label>
						<div className="cols-sm-10">
							<div className="input-group">
								<span className="input-group-addon">
									<i className="fa fa-lock fa-lg" 
										aria-hidden="true">
									</i></span>
								<input 
									value={this.state.password}
									onChange={this.onChange}
									type="password"
			
									name="password"
									className="form-control" 
									placeholder="Password" required
								/>
							</div>
							<span style={errStyle}>{this.state.passwordMsg}</span>
						</div>
					</div>
					
					<div className="form-group1">
						<label className="cols-sm-2 control-label">
			        <input type="checkbox" value="remember-me" name="rememberMe" className="form-level" 
			        /> Remember me
			      </label>
			    </div>
					
					<div className="form-group1">
						<button className="btn btn-primary btn-lg
						  btn-block login-button">
						  Log In
						</button>
					</div>

					<div className="form-group1">
	          Don't have an account? <Link to="/signup"><strong>Register</strong></Link>
	        </div>
			        
	        <div className="form-group1">
	          <a className="btn btn-primary btn-lg btn-block login-button" href="/auth/facebook">Login With Facebook</a>
	        </div>
			  </form>
			</div>
		);
	}
}

LoginForm.propTypes = {
	userLoginRequest: React.PropTypes.func.isRequired 
}

LoginForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}
export default LoginForm;