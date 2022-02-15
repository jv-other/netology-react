import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import searchReducer from "./searchSlice";
import saga from "../sagas";


const reducer = combineReducers({
  search: searchReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeEnhancer(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(saga);

export default store;