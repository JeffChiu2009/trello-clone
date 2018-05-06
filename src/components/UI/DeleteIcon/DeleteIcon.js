import React from "react";

const deleteIcon = ({handleDelete}) => (
	<div
	onClick={handleDelete}>
		<i className="material-icons right close">close</i>
	</div>
);

export default deleteIcon;