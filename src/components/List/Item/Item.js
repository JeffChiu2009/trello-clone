import React from "react";

const item = props => {
	const handleOnDeleteClick = event => {
		event.stopPropagation();
		props.onDeleteClickEvent();
	};
	return (
		<li
		className={props.className}
		onClick={props.onClickEvent}>
			<div
			onClick={handleOnDeleteClick}>
				<i className="material-icons right">close</i>
			</div>
			<p>{props.text}</p>
		</li>
	);
};

export default item;