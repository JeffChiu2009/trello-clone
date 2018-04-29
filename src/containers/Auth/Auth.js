import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import * as actions from "../../store/actions/";

class Auth extends Component {
	state = {
		isSignup: true,
		formData: {
			email: {
				value: "",
				validation: {
					required: true,
					isEmail: true
				},
				valid: false,
				touched: false
			},
			password: {
				value: "",
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			}
		}
	}

	checkValidity(value, rules) {
		let isValid = true;
		if(rules.required) {
			isValid = value.trim() !== "" && isValid;
		}
		if(rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if(rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}
		return isValid;
	}

	handleOnChange = (event, inputField) => {
		const updatedFormData = {
			...this.state.formData,
			[inputField]: {
				...this.state.formData[inputField],
				value: event.target.value,
				valid: this.checkValidity(event.target.value, this.state.formData[inputField].validation),
				touched: true
			}
		};
		this.setState({formData: updatedFormData});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.onAuth(this.state.formData.email.value, this.state.formData.password.value, this.state.isSignup);
	}

	handleSwitchAuthMode = () => {
		this.setState(prevState => {
			return {isSignup: !prevState.isSignup};
		});
	}

	render() {
		let emailValid = true;
		if(this.state.formData.email.touched && !this.state.formData.email.valid) {
			emailValid = false;
		}
		let passwordValid = true;
		if(this.state.formData.password.touched && !this.state.formData.password.valid) {
			passwordValid = false;
		}
		let form = (
			<div>
				<div className="center">
					<input 
						type="email" 
						className={emailValid ? "" : "invalid"}
						id="email" 
						name="email" 
						placeholder="Your email"
						value={this.state.formData.email.value}
						onChange={(event) => this.handleOnChange(event, "email")} />
				</div>
				<div className="center">
					<input 
						type="password" 
						className={passwordValid ? "" : "invalid"}
						id="password" 
						name="password" 
						placeholder="Minimum 6 character password" 
						value={this.state.formData.password.value}
						onChange={(event) => this.handleOnChange(event, "password")} />
				</div>
			</div>
		);
		if(this.props.loading) {
			form = <Spinner />;
		}
		let header = <h3 className="center">Sign Up to Use Trello Clone</h3>;
		let authCaption = (
			<div className="center">
				<p>Already have an account?</p>
				<button className="btn" onClick={this.handleSwitchAuthMode}>
					-- LOG IN --
				</button>
			</div>
		);
		let buttonText = "SIGN ME UP"
		if(!this.state.isSignup) {
			header = <h3 className="center">Log In to Trello Clone</h3>;
			authCaption = (
				<div className="center">
					<p>New to Trello Clone?</p>
					<button className="btn" onClick={this.handleSwitchAuthMode}>
						-- SIGN UP --
					</button>
				</div>
			);
			buttonText = "LOG ME IN"
		}
		return (
			<div className="boards-container">
				<div className="card-panel">
					<p className="center">
						Trello Clone let's you keep track of things in an organized way!
					</p>
					<p className="caption center">
						Our state of the art database will store your boards and lists!
					</p>
					<div className="card-panel">
						{header}
						<hr/>
						{authCaption}
						<p className="caption center">Any email, real or fake, will work</p>
						<p className="caption center">
							<strong>Or log in using test@test.com and test12</strong>
						</p>
						<form onSubmit={this.handleSubmit}>
							{form}
							<div className="center">
								<button 
									id="submitBtn" 
									className="btn">
										{buttonText} <i className="material-icons right">send</i>
								</button>
								{this.props.error ? <p className="auth-error">{this.props.error}</p> : null}
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);