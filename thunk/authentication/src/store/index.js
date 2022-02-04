import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import authReducer from "./authSlice";
import requestsReducer from "./requestsSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  requests: requestsReducer
});

export const tokenSelector = state => state.auth.token;

// сохранение токена в localStorage
const storeAuthTokenMiddleware = store => next => action => {
  const before = tokenSelector(store.getState());
  const result = next(action);
  const after = tokenSelector(store.getState());
  if (before !== after) {
    try {
      (null !== after)
        ? window.localStorage.setItem("token", after)
        : window.localStorage.removeItem("token");
    } catch (err) {
      console.warn(err);
    }
  }
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, storeAuthTokenMiddleware))
);
