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
				className="board-panel board"
				key={board.id}>
					<div
					onClick={() => this.props.onBoardDelete(board.id, this.props.token)}>
						<i className="material-icons right">close</i>
					</div>
					<Link to={"/board/" + board.id}>
						<h2 className="center catchy-title">{board.title}</h2>
					</Link>
				</div>
			);
		}
		return (
			<div className="boards-container">
				<form className="board-panel center" onSubmit={this.handleCreateBoard}>
					<label htmlFor="title">Enter a title for your new board</label>
					<input type="text" name="title" />
					<button type="submit" className="btn">Create</button>
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