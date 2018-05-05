import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import List from "../List/List";
import Form from "../UI/Form/Form";
import * as actions from "../../store/actions/";

class Board extends Component {
	handleAddList = event => {
		event.preventDefault();
		const pendingList = { title: event.target.listTitle.value, items: [] };
		this.props.onAddList(pendingList, this.props.token, this.props.match.params.b_id);
		event.target.reset();
	};

	handleAddListItem = (event, listId) => {
		event.preventDefault();
		const pendingListItem = {
			text: event.target.itemText.value,
			checked: false
		};
		this.props.onAddListItem(pendingListItem, listId, this.props.token, this.props.match.params.b_id);
		event.target.reset();
	};

	render() {
		if(!this.props.boards) {
			return <Redirect to="/" />
		}
		const board = this.props.boards.find(board => board.id === this.props.match.params.b_id);
		if(!board) {
			return <Redirect to="/boards" />
		}
		let lists = null;
		if(board.lists) {
			lists = board.lists.map(list => 
				<List
				key={list.id}
				list={list}
				token={this.props.token}
				boardId={board.id}
				handleAddListItem={this.handleAddListItem}
				onDeleteList={this.props.onDeleteList}
				onDeleteListItem={this.props.onDeleteListItem}
				onItemClick={this.props.onItemClick} />
			);
		}
		const inputInfo = {
			type: "text",
			name: "listTitle",
			placeholder: "List Title"
		};
		const labelInfo = {
			for: "listTitle",
			text: "Create a new list"
		}
		return (
			<div className="boards-container">
				<div className="board-panel center">
					<h2>{board.title}</h2>
					<Form 
					handleSubmit={this.handleAddList}
					input={inputInfo}
					label={labelInfo} />
				</div>
				{lists}
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
		onAddList: (pendingList, token, boardId) => {
			dispatch(actions.addList(pendingList, token, boardId));
		},
		onDeleteList: (listId, token, boardId) => {
			dispatch(actions.deleteList(listId, token, boardId));
		},
		onAddListItem: (pendingListItem, listId, token, boardId) => {
			dispatch(actions.addListItem(pendingListItem, listId, token, boardId));
		},
		onDeleteListItem: (listItemId, listId, token, boardId) => {
			dispatch(actions.deleteListItem(listItemId, listId, token, boardId));
		},
		onItemClick: (listItemId, listId, boardId, status, token) => {
			dispatch(actions.toggleItem(listItemId, listId, boardId, status, token));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);