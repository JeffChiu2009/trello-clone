import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/";

class Board extends Component {
	componentDidMount() {
		this.props.onBoardsFetch(this.props.token, this.props.userId);		
	}
	handleAddList = event => {
		event.preventDefault();
		const pendingList = { title: event.target.listTitle.value };	
		this.props.onAddList(pendingList, this.props.token, this.props.match.params.b_id);
	};

	render() {
		const board = this.props.boards.find(board => board.id === this.props.match.params.b_id);
		let lists = null;
		if(board.lists) {
			lists = board.lists.map(list => 
				<div className="list" key={list.id}>
					{list.title}
					<div
					onClick={() => this.props.onDeleteList(list.id, this.props.token, board.id)}
					className="right close-icon">
						<i className="material-icons">close</i>
					</div>
				</div>
			);
		}
		return (
			<main>
				<h2>{board.title}</h2>
				<form className="board" onSubmit={this.handleAddList}>
					<label htmlFor="listTitle">Create a List</label>
					<input type="text" name="listTitle" />
					<button type="submit">Create</button>
				</form>
				{lists}
			</main>
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
		onAddList: (pendingList, token, boardId) => {
			dispatch(actions.addList(pendingList, token, boardId));
		},
		onDeleteList: (listId, token, boardId) => {
			dispatch(actions.deleteList(listId, token, boardId));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);