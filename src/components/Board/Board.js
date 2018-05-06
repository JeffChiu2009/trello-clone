import React from "react";
import { NavLink } from "react-router-dom";
import DeleteIcon from "../UI/DeleteIcon/DeleteIcon";

const board = props => (
	<div className="board-panel board">
		<DeleteIcon handleDelete={props.handleDelete} />
		<NavLink to={"/boards/" + props.board.id} activeClassName="activeBoard">
			<h2 className="center catchy-title">{props.board.title}</h2>
			<p className="caption center">Created on {props.board.date ? props.board.date : ""}</p>
		</NavLink>
	</div>
);

export default board;