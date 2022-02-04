import { createStore, combineReducers } from "redux";
import servicesFormReducer from "./servicesFormReducer";
import servicesListReducer from "./servicesListReducer";

const rootReducer = combineReducers({
  list: servicesListReducer,
  form: servicesFormReducer
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
