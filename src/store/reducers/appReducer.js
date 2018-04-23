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
			};
		case "ADD_LIST_ITEM_SUCCESS":
			return {
				...state,
			};
		case "ADD_LIST_ITEM_FAIL":
			return {
				...state,
			};
		case "DELETE_LIST_ITEM_SUCCESS":
			return {
				...state,
			};
		case "DELETE_LIST_ITEM_FAIL":
			return {
				...state,
			};
		case "TOGGLE_LIST_ITEM":
			return {
				...state,
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