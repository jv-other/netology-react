import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import requestReducer from "./requestSlice";
import postsReducer from "./postsSlice";
import { handleRequestEpic, appendPostsEpic } from "../epics";

const reducer = combineReducers({
  request: requestReducer,
  posts: postsReducer
});

const epic = combineEpics(
  handleRequestEpic, appendPostsEpic
);

const epicMiddleware = createEpicMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancer(applyMiddleware(epicMiddleware)));

epicMiddleware.run(epic);

export default store;