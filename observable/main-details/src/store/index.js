import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import requestReducer from "./requestSlice";
import { handleRequestEpic } from "../epics";

const reducer = combineReducers({
  request: requestReducer
});

const epic = combineEpics(
  handleRequestEpic
);

const epicMiddleware = createEpicMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(epicMiddleware)));

epicMiddleware.run(epic);

export default store;