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
			<form 
				onSubmit={this.onSubmit}
				>

				<h1 className="text-center"><span style={titleStyle}>COl-Lab</span></h1>

				<div className="form-group">
					<label className="control-label">Your username</label>
					<input 
						value={this.state.username}
						onChange={this.onChange}
						name="username"
						placeholder="username"
						className="form-control" required
					/>
					<span style={errStyle}>{this.state.usernameMsg}</span>
				</div>
				
				<div className="form-group">
					<label className="control-label">Your password</label>
					<input 
						value={this.state.password}
						onChange={this.onChange}
						type="password"
						name="password"
						className="form-control"
						placeholder="password" required
					/>
					<span style={errStyle}>{this.state.passwordMsg}</span>
				</div>

				<div className="form-group">
					<label className="checkbox control-label">
				        <input type="checkbox" value="remember-me" name="rememberMe" className="form-level" 
				        /> Remember me
				      </label>
			    </div>
				
				<div className="form-group">
					<button className="btn btn-primary btn-lg"
					>
					Log In
					</button>
				</div>

				<div className="form-group">
          Don't have an account? <Link to="/signup"><strong>Register</strong></Link>
        </div>
		        
        <div className="form-group">
          <a className="btn btn-primary btn-lg" href="/auth/facebook"><span className="fa fa-facebook"></span>Sign In With facebook</a>
        </div>
		  </form>
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