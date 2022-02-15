import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import requestReducer from "./requestSlice";
import saga from "../sagas";

const reducer = combineReducers({
  request: requestReducer
});


const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(saga);

export default store;