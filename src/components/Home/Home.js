import React from "react";
import { Link } from "react-router-dom";

import Footer from "../Footer/Footer";
import Aux from "../../hoc/Aux";

const home = props => {
	let nextStep = (
		<Aux>
			<Link to="/auth">
				<button className="btn">
					Sign Up / Log In
				</button>
			</Link>
		</Aux>
	);
	if(props.isAuth) {
		nextStep = (
			<Link to="/boards">
				<button className="btn">
					Visit your boards page
				</button>
			</Link>
		);
	}
	return (
		<Aux>
			<div id="home">
				<div className="container">
					<div className="greeting center">
						<h1>Trello Clone lets you work more collaboratively and get more done.</h1>
						<p>Trello Clone's boards, lists, and sharing enables you to organize and prioritize your projects in a fun, flexible, and rewarding way.</p>
						{nextStep}
					</div>
				</div>
			</div>
			<div id="disclaimer">
				<div className="container">
					<div className="greeting center">
						<h1>Trello Clone is a challenge project made by <a className="mine" href="www.terencemangram.com">Terence Mangram.</a></h1>
						<p>This app is inspired by but not related to Trello in any way.</p>
					</div>
				</div>
			</div>
			<Footer />
		</Aux>
	);
};

export default home;