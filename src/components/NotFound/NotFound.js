import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1>Woops!</h1>
    <Link to="/">Head back to safety!</Link>
  </div>
)

export default NotFound;