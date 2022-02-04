/* Action types */

const FETCH_SERVICES_REQUEST = "FETCH_SERVICES_REQUEST";
const FETCH_SERVICES_FAILURE = "FETCH_SERVICES_FAILURE";
const FETCH_SERVICES_SUCCESS = "FETCH_SERVICES_SUCCESS";

const REMOVE_SERVICE_REQUEST = "REMOVE_SERVICE_REQUEST";
const REMOVE_SERVICE_FAILURE = "REMOVE_SERVICE_FAILURE";
const REMOVE_SERVICE_SUCCESS = "REMOVE_SERVICE_SUCCESS";

export const ActionTypes = {
  FETCH_SERVICES_REQUEST, FETCH_SERVICES_FAILURE, FETCH_SERVICES_SUCCESS,
  REMOVE_SERVICE_REQUEST, REMOVE_SERVICE_FAILURE, REMOVE_SERVICE_SUCCESS
};

/* Action creators */

const fetchServicesRequest = () => ({ type: FETCH_SERVICES_REQUEST });
const fetchServicesFailure = message => ({ type: FETCH_SERVICES_FAILURE, payload: { message } });
const fetchServicesSuccess = items => ({ type: FETCH_SERVICES_SUCCESS, payload: { items } });

const removeServiceRequest = serviceId => ({ type: REMOVE_SERVICE_REQUEST, payload: serviceId });
const removeServiceFailure = (serviceId, message) => (
  { type: REMOVE_SERVICE_FAILURE, payload: { serviceId, message } }
);
const removeServiceSuccess = serviceId => ({ type: REMOVE_SERVICE_SUCCESS, payload: serviceId });

export const ActionCreators = {
  fetchServicesRequest, fetchServicesFailure, fetchServicesSuccess,
  removeServiceRequest, removeServiceFailure, removeServiceSuccess
};

import { RequestStatuses as statuses } from "./requestStatuses";

const initialState = {
  loading: statuses.IDLE,
  error: null,
  items: [],
  removeRequests: {}
};

// Удаляет все успешные запроcы на удаление
const cleanSuccessedRequests = (requests) => Object.fromEntries(
  Object.entries(requests).filter(
    ([key, val]) => statuses.SUCCESS !== val.status
  )
);

export default function servicesListReducer(state = initialState, action) {

  const { payload } = action;

  switch (action.type) {
    // запрос на получение списка услуг
    case FETCH_SERVICES_REQUEST:
      return { ...state, loading: statuses.PENDING, items: [] };
    // ошибка получения списка
    case FETCH_SERVICES_FAILURE:
      return {
        ...state, loading: statuses.FAILURE, error: payload.message
      };
    // список услуг
    case FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        loading: statuses.SUCCESS,
        items: payload.items,
        removeRequests: cleanSuccessedRequests(state.removeRequests)
      };
    // запрос на удаление записи
    case REMOVE_SERVICE_REQUEST:
      return {
        ...state, removeRequests: { ...state.removeRequests, [payload]: { status: statuses.PENDING } }
      };
    // ошибка запроса на удаление
    case REMOVE_SERVICE_FAILURE:
      const { serviceId, message } = payload;
      return {
        ...state,
        removeRequests: {
          ...state.removeRequests, [serviceId]: { status: statuses.FAILURE, error: message }
        }
      };
    // успешное удаление записи
    case REMOVE_SERVICE_SUCCESS:
      return {
        ...state, removeRequests: { ...state.removeRequests, [payload]: { status: statuses.SUCCESS } }
      };
    default:
      return state;
  };

};

