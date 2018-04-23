const initialState = {
	boards: [],
	loading: false,
	error: null
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case "LOADING_START":
			return {
				...state,
				loading: true,
				error: null
			};
		case "ADD_BOARD_SUCCESS":
			const newBoard = {
				...action.payload,
				id: action.id
			};
			return {
				...state,
				boards: state.boards.concat(newBoard),
				loading: false,
				error: null
			};
		case "ADD_BOARD_FAIL":
			return {
				...state,
				loading: false,
				error: action.error
			};
		case "DELETE_BOARD_SUCCESS":
			return {
				...state,
				boards: state.boards.filter(board => board.id !== action.id),
				loading: false,
				error: null
			};
		case "DELETE_BOARD_FAIL":
			return {
				...state,
				loading: false,
				error: action.error
			};
		case "ADD_LIST_SUCCESS":
			const newList = {
				...action.payload,
				id: action.listId
			};
			const newBoards = state.boards.map(board => {
				if(board.id !== action.boardId) {
					return board;
				}
				const addListArray = Object.keys(board.lists).map(key => {
						return {
							...board.lists[key],
							id: key
						};
					}
				);
				const targetBoard = {
					...board,
					lists: addListArray.concat(newList)
				};
				return { ...targetBoard };
			});
			return {
				...state,
				boards: [...newBoards],
				loading: false,
				error: null
			};
		case "ADD_LIST_FAIL":
			return {
				...state,
				error: action.error
			};
		case "DELETE_LIST_SUCCESS":
			const newBoardsForDelete = state.boards.map(board => {
				const newBoard = {
					...board,
					lists: board.lists.filter(list => list.id !== action.listId)
				};
				return newBoard
			});
			return {
				...state,
				boards: newBoardsForDelete,
				loading: false,
				error: null
			};
		case "DELETE_LIST_FAIL":
			return {
				...state,
				error: action.error
			};
		case "ADD_LIST_ITEM_SUCCESS":
			const newListItem = {
				...action.payload,
				id: action.listItemId
			};
			const newBoardsforListItem = state.boards.map(board => {
				if(board.id !== action.boardId) {
					return board;
				}
				const targetBoardLists = board.lists.map(list => {
					if(list.id !== action.listId) {
						return list;
					}
					const targetList = {
						...list,
						text: list.text.concat(newListItem)
					};
					return targetList;
				})
				const targetBoardforListItem = {
					...board,
					lists: targetBoardLists
				};
				return targetBoardforListItem;
			});
			return {
				...state,
				boards: newBoardsforListItem,
				loading: false,
				error: null
			};
		case "ADD_LIST_ITEM_FAIL":
			return {
				...state,
				error: action.error
			};
		case "DELETE_LIST_ITEM_SUCCESS":
		const newBoardsForItemDelete = state.boards.map(board => {
			const newBoardList = board.lists.map(list => {
				return {
					...list,
					text: list.text.filter(text => text.id !== action.listItemId)
				};
			});
			const newBoardInItemDelete = {
				...board,
				lists: newBoardList 
			};
			return newBoardInItemDelete;
		});
			return {
				...state,
				boards: newBoardsForItemDelete,
				loading: false,
				error: null
			};
		case "DELETE_LIST_ITEM_FAIL":
			return {
				...state,
				error: action.error
			};
		case "FETCH_BOARDS_SUCCESS":
			return {
				...state,
				boards: action.boards,
				loading: false,
				error: false
			}
		default:
			return { state };
	}
};

export default reducer;