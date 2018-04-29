import React from "react";

const list = props => {
	const checked = "list-item checked";
	const unchecked = "list-item";
	let listItems = null;
	if(props.list.items) {
		listItems = props.list.items.map(item =>
			<li 
			key={item.id} 
			className={item.checked ? checked : unchecked}
			onClick={() => props.onItemClick(item.id, props.list.id, props.boardId, item.checked, props.token)}>
				<div
				onClick={() => props.onDeleteListItem(item.id, props.list.id, props.token, props.boardId)}>
					<i className="material-icons right">close</i>
				</div>
				<p>{item.text}</p>
			</li>
		);
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
				<li>
					<form 
					onSubmit={(event) => props.handleAddListItem(event, props.list.id)}>
						<input type="text" name="text" />
					</form>
				</li>
			</ul>
		</div>
	);
};

export default list;