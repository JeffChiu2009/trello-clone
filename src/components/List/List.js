import React from "react";

import Item from "./Item/Item";
import Form from "../UI/Form/Form";
import DeleteIcon from "../UI/DeleteIcon/DeleteIcon";

const list = props => {
	const checked = "list-item checked";
	const unchecked = "list-item";
	let listItems = null;
	if(props.list.items) {
		listItems = props.list.items.map(item =>
			<Item 
			key={item.id}
			text={item.text}
			date={item.date ? item.date : ""}
			className={item.checked ? checked : unchecked}
			onClickEvent={() => props.onItemClick(item.id, props.list.id, props.boardId, item.checked, props.token)}
			handleDelete={() => props.onDeleteListItem(item.id, props.list.id, props.token, props.boardId)}/>
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
			<DeleteIcon 
			handleDelete={() => props.onDeleteList(props.list.id, props.token, props.boardId)} />
			<h2 className="catchy-title center">{props.list.title}</h2>
			<p className="caption center">Created on {props.list.date ? props.list.date : ""}</p>
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