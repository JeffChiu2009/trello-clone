import React from "react";
import Form from "../UI/Form/Form";
import Aux from "../../hoc/Aux";
import "./Sidebar.css";

const sidebar = props => {
	let boardsList = (
		<div className="board-panel board">
			<p>Create your first board to get started!</p>
		</div>
	);
	let connectedBoards = null;
	if(props.connectedBoards) {
		connectedBoards = (
			<Aux>
				<hr/>
				<h3 className="sidebar-header">Connected boards</h3>
				<hr/>
				{props.connectedBoards}
			</Aux>
		);
	}
	if(props.boards) {
		boardsList = (
			<Aux>
				<h3 className="sidebar-header">Your boards</h3>
				<hr/>
				{props.boards}
				{connectedBoards}
			</Aux>
		);
	}
	const inputInfo = {
		type: "text",
		name: "boardTitle",
		placeholder: "Board Title"
	};
	const labelInfo = {
		for: "boardTitle",
		text: "Create a new board"
	};
	return (
		<div id="sidebar">
			<div className="boards-list">
				{boardsList}
				<div className="board-panel board-create center">
					<Form 
					handleSubmit={props.onCreateBoard}
					input={inputInfo}
					label={labelInfo}	 />
				</div>
			</div>
		</div>
	);
};

export default sidebar;