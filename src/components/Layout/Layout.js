import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import * as actions from "../../store/actions/";

class Layout extends Component {
	render() {
		let navbar = (
			<li>
				<Link	to="/auth">
					<button className="btn">
						Login
					</button>
				</Link>
			</li>
		);
		if(this.props.isAuth) {
			navbar = (
				<li>
					<Link 
					onClick={() => this.props.onLogout()}
					to="/">
						<button className="btn">
							Log Out
						</button>
					</Link>
				</li>
			)
		}
		return (
			<Aux>
				<header>
					<Link id="logo" to="/">
						Trello Clone
					</Link>
					<nav>
						<ul>
							{navbar}
						</ul>
					</nav>
				</header>
				<main>
					{this.props.children}
				</main>
			</Aux>
		);
	}
};

const mapStateToProps = state => {
	return {
		isAuth: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logout())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));