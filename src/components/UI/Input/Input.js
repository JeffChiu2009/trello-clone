import React from "react";

const input = props => {
	let inputClass = props.className ? props.className : "";
	let inputPlaceholder = props.placeholder ? props.placeholder : "";
	return (
		<input 
		type={props.type} 
		name={props.name}
		className={inputClass}
		placeholder={inputPlaceholder} />
	);
};

export default input;