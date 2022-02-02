import { createStore, combineReducers } from "redux";
import { createSelector } from "reselect";
import servicesReducer from "./servicesSlice";
import filtersReducer from "./filtersSlice";

const rootReducer = combineReducers({
  services: servicesReducer,
  filters: filtersReducer
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// services list selector
export const servicesSelector = state => state.services.list;

// filter by name selector
export const filterByNameSelector = state => state.filters.name;

// item for editing selector
export const selectedServiceSelector = createSelector(
  servicesSelector,
  state => state.services.selectedId,
  (services, selectedId) => selectedId && services.find(item => selectedId === item.id)
);

// filtered services selector
export const filteredServicesSelector = createSelector(
  servicesSelector,
  filterByNameSelector,
  (services, filter) => filter ? services.filter(item => item.name.includes(filter)) : services
);