import React from "react";

const list = props => {
	let listItems = [];
	if(props.list.text) {
		listItems = props.list.text.map(listItem =>
			<li key={listItem.id}>
				<p>
					{listItem.text}
				</p>
				<div
				onClick={() => props.onDeleteListItem(listItem.id, props.list.id, props.token, props.boardId)}
				className="right close-icon">
					<i className="material-icons">close</i>
				</div>
			</li>
		);
	}
	return (
		<div className="list">
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