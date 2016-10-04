import React from 'react';
import {Link} from 'react-router';


class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
			username:'',
			password:'',
			
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
			() => {
				this.context.router.push('/');
			}
		);
	}

	
	render() {
		return (
			<form data-toggle="validator" 
				role="form"
				onSubmit={this.onSubmit}
				
				>

				<h1>Welcome to COlLab</h1>

				<div className="form-group">
					<label className="control-label">Username</label>
					<input 
						value={this.state.username}
						onChange={this.onChange}
						type="text"
						name="username"
						placeholder="username"
						className="form-control" required
					/>
				</div>

				

				<div className="form-group">
					<label className="control-label">Password</label>
					<input 
						value={this.state.password}
						onChange={this.onChange}
						type="password"
						data-minlength="6"
						name="password"
						className="form-control"
						id="inputPassword" 
						placeholder="password" required
					/>
					<div className="help-block">Minimum of 6 characters</div>
				</div>

				

				<div className="form-group">
					<button className="btn btn-primary btn-lg">
					Log In
					</button>
				</div>
				<div className="form-group">
		          Don't have an account? <Link to="/signup">Register</Link>
		        </div>
		        <div className="form-group">
		          <a className="btn btn-danger btn-lg" href="/auth/google">Sign In With Google</a>
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