import axios from "axios";

export const authStart = () => {
	return {
		type: "AUTH_START"
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: "AUTH_SUCCESS",
		idToken: token,
		userId: userId
	};
};

export const authFail = (error) => {
	return {
		type: "AUTH_FAIL",
		error: error
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationDate");
	localStorage.removeItem("userId");
	return {
		type: "AUTH_LOGOUT",
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBTV7uVKv23aDtGmSq2h9gI1Vf-PuwygbE";
		if(!isSignup) {
			url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBTV7uVKv23aDtGmSq2h9gI1Vf-PuwygbE";
		}
		axios.post(url, authData)
			.then(res => {
				const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
				localStorage.setItem("token", res.data.idToken);
				localStorage.setItem("expirationDate", expirationDate);
				localStorage.setItem("userId", res.data.localId);
				dispatch(authSuccess(res.data.idToken, res.data.localId));
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})
			.catch(err => {
				const errorMessage = err.response.data.error.message.replace(/_/g, " ");
				dispatch(authFail(errorMessage));
			});
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem("token");
		if(!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem("expirationDate"));
			if(expirationDate <= new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem("userId");
				dispatch(authSuccess(token, userId));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			}
		}
	};
};