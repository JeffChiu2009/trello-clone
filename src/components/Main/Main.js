import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import BoardView from "../BoardView/BoardView";
import Board from "../Board/Board";
import Aux from "../../hoc/Aux";
import * as actions from "../../store/actions/";

class Main extends Component {
	componentDidMount() {
		this.props.onBoardsFetch(this.props.token, this.props.userId);		
	}	

	handleCreateBoard = event => {
		event.preventDefault();
		if(event.target.boardTitle.value === "") {
			return this.displayToast();
		}
		const newBoard = {
			userId: this.props.userId,
			title: event.target.boardTitle.value,
			date: new Date().toLocaleString("en-US"),
			lists: []
		};
		this.props.onBoardAdd(newBoard, this.props.token);
		event.target.reset();
	};

	displayToast = () => {
		const toast = document.getElementById("toast");
		toast.classList.add("show");
		setTimeout(() => {toast.classList.remove("show")}, 2000);
	};

	render() {
		let boards = null;
		if(this.props.boards) {
			boards = this.props.boards.map(board =>
				<Board 
				key={board.id} 
				board={board} 
				handleDelete={() => this.props.onBoardDelete(board.id, this.props.token)} />
			);
		}
		return (
			<Aux>
				<Sidebar boards={boards} onCreateBoard={this.handleCreateBoard} />
        <Route path="/boards/:b_id" component={BoardView} />
        <div id="toast">Enter a value to create!</div>
			</Aux>
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