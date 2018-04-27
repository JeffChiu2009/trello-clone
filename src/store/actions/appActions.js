import axios from "axios";

/* ADD A BOARD */
export const addBoard = (pendingBoard, token) => {
	return dispatch => {
		dispatch(loadingStart()); // start loading spinner
		axios.post("https://trello-clone-f42b4.firebaseio.com/boards.json?auth=" + token, pendingBoard)
			.then(res => {
				dispatch(addBoardSuccess(res.data.name, pendingBoard))
			})
			.catch(err => {
				dispatch(addBoardFail(err));
			});
	};
};

export const addBoardSuccess = (id, newBoard) => {
	return {
		type: "ADD_BOARD_SUCCESS",
		payload: newBoard,
		id: id
	};
};

export const addBoardFail = (error) => {
	return {
		type: "ADD_BOARD_FAIL",
		error: error
	};
};

/* DELETE A BOARD */
export const deleteBoard = (boardId, token) => {
	return dispatch => {
		dispatch(loadingStart());
		const deleteParams = boardId + ".json?auth=" + token;
		axios.delete("https://trello-clone-f42b4.firebaseio.com/boards/" + deleteParams)
			.then(res => {
				dispatch(deleteBoardSuccess(boardId));
			})
			.catch(err => {
				console.log("Error with deleting: ", err);
				dispatch(deleteBoardFail());
			});
	};
};

export const deleteBoardSuccess = boardId => {
	return {
		type: "DELETE_BOARD_SUCCESS",
		id: boardId
	};
};

export const deleteBoardFail = error => {
	return {
		type: "DELETE_BOARD_FAIL",
		error: error
	};
};

/* ADD A LIST */
export const addList = (pendingList, token, boardId	) => {
	return dispatch => {
		dispatch(loadingStart());
		axios.post("https://trello-clone-f42b4.firebaseio.com/boards/" + boardId + "/lists.json?auth=" + token, pendingList)
		.then(res => {
			dispatch(addListSuccess(res.data.name, pendingList, boardId));
		})
		.catch(err => {
			dispatch(addListFail(err));
		});
	}
}

export const addListSuccess = (listId, newList, boardId) => {
	return {
		type: "ADD_LIST_SUCCESS",
		boardId: boardId,
		payload: newList,
		listId: listId
	}
}

export const addListFail = error => {
	console.log("[ADD_LIST_FAIL]", error);
	return {
		type: "ADD_LIST_FAIL",
		error: error
	}
}

/* DELETE A LIST */
export const deleteList = (listId, token, boardId) => {
	return dispatch => {
		dispatch(loadingStart());
		const deleteParams = boardId + "/lists/" + listId + ".json?auth=" + token;
		axios.delete("https://trello-clone-f42b4.firebaseio.com/boards/" + deleteParams)
			.then(res => {
				dispatch(deleteListSuccess(listId, boardId));
			})
			.catch(err => {
				console.log("Error with deleting: ", err);
				dispatch(deleteListFail());
			});
	};
};

export const deleteListSuccess = listId => {
	return {
		type: "DELETE_LIST_SUCCESS",
		listId: listId
	};
};

export const deleteListFail = error => {
	return {
		type: "DELETE_LIST_FAIL",
		error: error
	};
};

/* ADD A LIST ITEM */
//need board name/id and list name/id
export const addListItem = (pendingListItem, listId, token, boardId	) => {
	return dispatch => {
		dispatch(loadingStart());
		const itemParams = "/boards/" + boardId + "/lists/" + listId + "/items.json?auth=" + token;
		axios.post("https://trello-clone-f42b4.firebaseio.com" + itemParams, pendingListItem)
		.then(res => {
			dispatch(addListItemSuccess(res.data.name, pendingListItem, listId, boardId));
		})
		.catch(err => {
			dispatch(addListItemFail(err));
		});
	};
};

export const addListItemSuccess = (listItemId, newListItem, listId, boardId) => {
	return {
		type: "ADD_LIST_ITEM_SUCCESS",
		listItemId: listItemId,
		payload: newListItem,
		listId: listId,
		boardId: boardId
	};
};

export const addListItemFail = error => {
	return {
		type: "ADD_LIST_ITEM_FAIL",
		error: error
	};
};

/* DELETE A LIST ITEM */
export const deleteListItem = (listItemId, listId, token, boardId) => {
	return dispatch => {
		dispatch(loadingStart());
		const deleteItemParams = boardId + "/lists/" + listId + "/items/" + listItemId + ".json?auth=" + token;
		axios.delete("https://trello-clone-f42b4.firebaseio.com/boards/" + deleteItemParams)
			.then(res => {
				dispatch(deleteListItemSuccess(listItemId, listId, boardId));
			})
			.catch(err => {
				console.log("Error with deleting: ", err);
				dispatch(deleteListItemFail());
			});
	};
};

export const deleteListItemSuccess = listItemId => {
	return {
		type: "DELETE_LIST_ITEM_SUCCESS",
		listItemId: listItemId
	};
};

export const deleteListItemFail = error => {
	return {
		type: "DELETE_LIST_ITEM_FAIL",
		error: error
	};
};

/* TOGGLE ITEM STATUS */
export const toggleItem = (listItemId, listId, boardId, status, token) => {
	return dispatch => {
		dispatch(loadingStart());
		const toggleParams = boardId + "/lists/" + listId + "/items/" + listItemId + "/checked.json?auth=" + token;
		axios.put("https://trello-clone-f42b4.firebaseio.com/boards/" + toggleParams, !status)
			.then(res => {
				dispatch(toggleItemSuccess(listItemId, !status));
			})
			.catch(err => {
				console.log("Error while toggling", err);
				dispatch(toggleItemFail(err));
			});
	};
};

export const toggleItemSuccess = (listItemId, newStatus) => {
	return {
		type: "TOGGLE_ITEM_SUCCESS",
		listItemId: listItemId,
		newStatus: newStatus
	};
};

export const toggleItemFail = error => {
	return {
		type: "TOGGLE_ITEM_SUCCESS",
		error: error
	};
};

/* FETCH USERS BOARDS */
export const fetchBoards = (token, userId) => {
	return dispatch => {
		dispatch(loadingStart());
		const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
		axios.get('https://trello-clone-f42b4.firebaseio.com/boards.json' + queryParams)
			.then(res => {
				const fetchedBoards = [];
				for(let key in res.data) {
					let lists = [];
					if(res.data[key].lists) {
						lists = Object.keys(res.data[key].lists).map(listKey => {
							let listItems = [];
							if(res.data[key].lists[listKey].items) {
								listItems = Object.keys(res.data[key].lists[listKey].items).map(itemKey => {
									return {
										...res.data[key].lists[listKey].items[itemKey],
										id: itemKey
									};
								});
							}
							return {
								...res.data[key].lists[listKey],
								id: listKey,
								items: listItems
							};
						});
					}
					fetchedBoards.push({
						...res.data[key],
						id: key,
						lists: lists
					});
				}
				dispatch(fetchBoardsSuccess(fetchedBoards));
			})
			.catch(err => {
				console.log("[ERROR AT FETCH]", err)
				dispatch(fetchBoardsFail(err));
			});
	};
};

export const fetchBoardsSuccess = userBoards => {
	return {
		type: "FETCH_BOARDS_SUCCESS",
		boards: userBoards
	};
};

export const fetchBoardsFail = error => {
	return {
		type: "FETCH_BOARDS_FAIL",
		error: error
	};
};

/* LOADING */
export const loadingStart = () => {
	return {
		type: "LOADING_START"
	};
};