import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";

class Main extends Component {
	componentDidMount() {
		this.props.onBoardsFetch(this.props.token, this.props.userId);		
	}
	handleCreateBoard = (event) => {
		event.preventDefault();
		const newBoard = {
			userId: this.props.userId,
			title: event.target.title.value,
			lists: []
		};
		this.props.onBoardAdd(newBoard, this.props.token);
	};
	render() {
		// display boards from props, make boards-container a flex parent, wrap downward
		// each board will be a link to the /boards/:b_id route where lists and list items can be made
		let boards = null;
		if(this.props.boards) {
			boards = this.props.boards.map(board => 
				<div
				className="board"
				key={board.id}>
					<Link to={"/board/" + board.id}>
						<h2>{board.title}</h2>
					</Link>
					<div
					onClick={() => this.props.onBoardDelete(board.id, this.props.token)}
					className="right close-icon">
						<i className="material-icons">close</i>
					</div>
				</div>
			);
		}
		return (
			<div className="boards-container">
				<form className="board-create" onSubmit={this.handleCreateBoard}>
					<label htmlFor="title">Enter a title for your board</label>
					<input type="text" name="title" />
					<button type="submit">Create</button>
				</form>
				{boards}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token,
		userId: state.auth.userId,
		boards: state.app.boards
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onBoardsFetch: (token, userId) => dispatch(actions.fetchBoards(token, userId)),
		onBoardAdd: (newBoard, token) => dispatch(actions.addBoard(newBoard, token)),
		onBoardDelete: (boardId, token) => dispatch(actions.deleteBoard(boardId, token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);