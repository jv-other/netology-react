import { connect } from "react-redux";

import ServiceList from "./ServiceList";
import ServiceForm from "./ServiceForm";
import ServiceFilter from "./ServiceFilter";

// store selectors
import * as selectors from "../store";
// services actions
import * as actions from "../store/servicesSlice";

// обертка формы для работы с store
export const WithStoreServiceForm = connect(
  (state) => ({
    item: selectors.selectedServiceSelector(state)
  }),
  (dispatch) => ({
    onSubmit: data => dispatch(actions.save(data)),
    onCancel: () => dispatch(actions.select(null))
  })
)(ServiceForm);

// обертка списка для работы с store
export const WithStoreServiceList = connect(
  (state) => ({
    items: selectors.filteredServicesSelector(state)
  }),
  (dispatch) => ({
    onEdit: serviceId => dispatch(actions.select(serviceId)),
    onRemove: serviceId => dispatch(actions.remove(serviceId))
  })
)(ServiceList);

export { ServiceFilter };