import React from 'react';
import classnames from 'classnames';
import {Link} from 'react-router'


class SignupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname:'',
			lastname:'',
			username:'',
			email:'',
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
		this.setState({errors: {} });
		e.preventDefault();
		this.props.userSignupRequest(this.state).then(
			() => {
				this.props.addFlashMessage({
					type: 'success',
					text: 'you signed up successfully. Welcome'
				})
				this.context.router.push('/');
			},
				

		);
	}

	render() {
		const {errors} = this.state;
		return (
			<form  
				role="form"
				onSubmit={this.onSubmit}>

				<h1>Welcome to ColLab</h1>

				<div className="form-group" >
					<label className="control-label">Firstname</label>
					<input 
						value={this.state.firstname}
						onChange={this.onChange}
						type="text"
						name="firstname"
						className="form-control"
						placeholder="Clara" required
					/>
				</div>

				<div className="form-group">
					<label className="control-label">Lastname</label>
					<input 
						value={this.state.lastname}
						onChange={this.onChange}
						type="text"
						name="lastname"
						className="form-control"
						placeholder="Bell" required
					/>
				</div>

				<div className="form-group">
					<label className="control-label">Username</label>
					<input 
						value={this.state.username}
						onChange={this.onChange}
						type="text"
						name="username"
						placeholder="Mike123"
						className="form-control" required
					/>
				</div>

				<div className="form-group">
					<label className="control-label">Email</label>
					<input 
						value={this.state.email}
						onChange={this.onChange}
						type="text"
						name="email"
						placeholder="Email" 
						className="form-control" required
						
				    />
				    <div className="help-block with-errors"></div>
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
						placeholder="Password" required
					/>
					<div className="help-block">Minimum of 6 characters</div>
				</div>

				<div className="form-group">
					<button className="btn btn-primary btn-lg">
					Sign up
					</button>
				</div>
				<div className="form-group">
		          Already have an account? <Link to="/login">Sign in</Link>
		        </div>
		        <div className="form-group">
		          <a className="btn btn-danger btn-lg" href="/auth/google">Sign Up With Google</a>
		        </div>
			</form>
		);
	}
}

SignupForm.propTypes = {

	userSignupRequest: React.PropTypes.func.isRequired, 
	addFlashMessage: React.PropTypes.func.isRequired 
}

SignupForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}
export default SignupForm;