import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="boards-container">
  	<div className="card-panel center">
	    <h1>Woops!</h1>
	    <Link className="redirect" to="/">Head back to safety!</Link>
  	</div>
  </div>
)

export default NotFound;