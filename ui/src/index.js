import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import View from "./components/view";
import RootReducer from "./reducer";
import RootSaga from "./saga";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware(),
	store = createStore(
		RootReducer,
		composeEnhancers(
			applyMiddleware(sagaMiddleware)
		)
	);

sagaMiddleware.run(RootSaga);
ReactDOM.render(
	<Provider store={store}>
		<View />
	</Provider>, document.getElementById("eq-root")
);
registerServiceWorker();