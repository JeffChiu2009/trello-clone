import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import appReducer from "./store/reducers/appReducer";
import authReducer from "./store/reducers/authReducer";

const rootReducer = combineReducers({
	auth: authReducer,
	app: appReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const app = (
	<Provider store={store}>
		<App />
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
