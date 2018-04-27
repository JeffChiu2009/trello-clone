import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";

import Aux from "../../hoc/Aux";

class Layout extends Component {
	render() {
		let navbar = (
			<li>
				<Link	to="/">Please log in</Link>
			</li>
		);
		if(this.props.isAuth) {
			navbar = (
				<li>
					<Link 
					onClick={() => this.props.onLogout()}
					to="/">Log Out</Link>
				</li>
			)
		}
		return (
			<Aux>
				<header>
					<div>
						Trello Clone
					</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);