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
		let form = (
			<div className="row">
				<div className="input-field col s6">
					<input 
						type="email" 
						className="validate" 
						id="email" 
						name="email" 
						placeholder="Your email" 
						value={this.state.formData.email.value}
						onChange={(event) => this.handleOnChange(event, "email")} />
				</div>
				<div className="input-field col s6">
					<input 
						type="password" 
						className="validate" 
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
		let header = <h4 className="center">Sign Up and Join <span>Nihon ALT</span></h4>;
		if(!this.state.isSignup) {
			header = <h4 className="center">Sign In to <span>Nihon ALT</span></h4>;
		}
		return (
			<div className="col m12 l4">
				<div className="card-panel">
					{header}
					<div className="switch center">
				    <label>
				      Sign up
				      <input type="checkbox" onClick={this.handleSwitchAuthMode} />
				      <span className="lever"></span>
				      Sign in
				    </label>
				  </div>
					<p className="caption center">People helping people. It's powerful stuff. Help contribute to NihonALT.</p>
					<div className="row">
						<form className="col s12" onSubmit={this.handleSubmit}>
							{form}
							<div className="center">
								<button 
									id="submitBtn" 
									className="btn">
										Submit <i className="material-icons right">send</i>
								</button>
								{this.props.error ? <p>{this.props.error}</p> : null}
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