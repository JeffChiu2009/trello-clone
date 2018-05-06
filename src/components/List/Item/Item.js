import React from "react";
import DeleteIcon from "../../UI/DeleteIcon/DeleteIcon";

const item = props => {
	const handleOnDeleteClick = event => {
		event.stopPropagation();
		props.handleDelete();
	};
	return (
		<li
		className={props.className}
		onClick={props.onClickEvent}>
			<DeleteIcon handleDelete={handleOnDeleteClick} />
			<p>{props.text}</p>
			<p className="caption">{props.date ? props.date : ""}</p>
		</li>
	);
};

export default item;