import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = props => (
  <div className="boards-container">
  	<div className="card-panel center">
	    <h1>Woops!</h1>
	    <Link className="redirect" to={props.isAuth ? "/boards" : "/"}>
		    Head back to safety!
	    </Link>
  	</div>
  </div>
)

export default NotFound;