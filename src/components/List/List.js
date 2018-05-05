import React from "react";

import Item from "./Item/Item";
import Form from "../UI/Form/Form";

const list = props => {
	const checked = "list-item checked";
	const unchecked = "list-item";
	let listItems = null;
	if(props.list.items) {
		listItems = props.list.items.map(item =>
			<Item 
			key={item.id}
			text={item.text}
			className={item.checked ? checked : unchecked}
			onClickEvent={() => props.onItemClick(item.id, props.list.id, props.boardId, item.checked, props.token)}
			onDeleteClickEvent={() => props.onDeleteListItem(item.id, props.list.id, props.token, props.boardId)}/>
		);
	}
	const inputInfo = {
		type: "text",
		name: "itemText",
		placeholder: ""
	};
	const labelInfo = {
		for: "itemText",
		text: "Create a new item"
	}
	return (
		<div className="list">
			<div
			onClick={() => props.onDeleteList(props.list.id, props.token, props.boardId)}>
				<i className="material-icons right">close</i>
			</div>
			<h3 className="catchy-title center">{props.list.title}</h3>
			<ul>
				{listItems}
				<li className="center">
					<Form 
					handleSubmit={(event) => props.handleAddListItem(event, props.list.id)}
					input={inputInfo}
					label={labelInfo} />
				</li>
			</ul>
		</div>
	);
};

export default list;