import React from "react";

const list = props => {
	let listItems = null;
	if(props.list.items) {
		listItems = props.list.items.map(item =>
			<li key={item.id}>
				<p 
				className={item.checked ? "checked" : ""}
				onClick={() => props.onItemClick(item.id, props.list.id, props.boardId, item.checked, props.token)}>
					{item.text}
				</p>
				<div
				onClick={() => props.onDeleteListItem(item.id, props.list.id, props.token, props.boardId)}
				className="right close-icon">
					<i className="material-icons">close</i>
				</div>
			</li>
		);
	}
	return (
		<div className="card-panel list">
			<div
			onClick={() => props.onDeleteList(props.list.id, props.token, props.boardId)}
			className="right close-icon">
				<i className="material-icons">close</i>
			</div>
			{props.list.title}
			<ul>
				{listItems}
				<li>
					<form onSubmit={(event) => props.handleAddListItem(event, props.list.id)}>
						<input type="text" name="text" />
					</form>
				</li>
			</ul>
		</div>
	);
};

export default list;