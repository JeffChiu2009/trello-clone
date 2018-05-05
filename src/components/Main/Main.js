import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import Board from "../Board/Board";
import * as actions from "../../store/actions/";

class Main extends Component {
	componentDidMount() {
		this.props.onBoardsFetch(this.props.token, this.props.userId);		
	}	

	handleCreateBoard = event => {
		event.preventDefault();
		const newBoard = {
			userId: this.props.userId,
			title: event.target.boardTitle.value,
			lists: []
		};
		this.props.onBoardAdd(newBoard, this.props.token);
		event.target.reset();
	};

	render() {
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
					<NavLink to={"/boards/" + board.id}>
						<h2 className="center catchy-title">{board.title}</h2>
					</NavLink>
				</div>
			);
		}
		return (
			<div>
				<Sidebar boards={boards} onCreateBoard={this.handleCreateBoard} />
        <Route path="/boards/:b_id" component={Board} />
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