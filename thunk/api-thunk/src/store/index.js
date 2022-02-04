import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import servicesFormReducer from "./servicesFormReducer";
import servicesListReducer from "./servicesListReducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
  list: servicesListReducer,
  form: servicesFormReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
