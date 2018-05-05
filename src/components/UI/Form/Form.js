import React from "react";

import Input from "../Input/Input";

const form = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<label htmlFor={props.label.for}>{props.label.text}</label>
			<Input 
			type={props.input.type}
			name={props.input.name} 
			placeholder={props.input.placeholder}/>
			<button type="submit" className="btn">Create</button>
		</form>
	);
};

export default form;