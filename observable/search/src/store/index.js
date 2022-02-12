import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import searchReducer from "./searchSlice";
import { changeSearchEpic, searchRequestEpic } from "../epics";

const reducer = combineReducers({
  search: searchReducer
});

const epic = combineEpics(
  changeSearchEpic,
  searchRequestEpic
);

const epicMiddleware = createEpicMiddleware();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(epicMiddleware)));

epicMiddleware.run(epic);

export default store;