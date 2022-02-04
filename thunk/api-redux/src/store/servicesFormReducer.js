/* Action types */

const FETCH_SERVICE_REQUEST = "FETCH_SERVICE_REQUEST";
const FETCH_SERVICE_FAILURE = "FETCH_SERVICE_FAILURE";
const FETCH_SERVICE_SUCCESS = "FETCH_SERVICE_SUCCESS";

const SAVE_SERVICE_REQUEST = "SAVE_SERVICE_REQUEST";
const SAVE_SERVICE_FAILURE = "SAVE_SERVICE_FAILURE";
const SAVE_SERVICE_SUCCESS = "SAVE_SERVICE_SUCCESS";
const SAVE_SERVICE_RESET = "SAVE_SERVICE_RESET";

export const ActionTypes = {
  FETCH_SERVICE_REQUEST, FETCH_SERVICE_FAILURE, FETCH_SERVICE_SUCCESS,
  SAVE_SERVICE_REQUEST, SAVE_SERVICE_FAILURE, SAVE_SERVICE_SUCCESS, SAVE_SERVICE_RESET
};

/* Action creators */

const fetchServiceRequest = () => ({ type: FETCH_SERVICE_REQUEST });
const fetchServiceFailure = message => ({ type: FETCH_SERVICE_FAILURE, payload: { message } });
const fetchServiceSuccess = item => ({ type: FETCH_SERVICE_SUCCESS, payload: { item } });

const saveServiceRequest = item => ({ type: SAVE_SERVICE_REQUEST, payload: item });
const saveServiceFailure = message => ({ type: SAVE_SERVICE_FAILURE, payload: { message } });
const saveServiceSuccess = () => ({ type: SAVE_SERVICE_SUCCESS });
const saveServiceReset = () => ({ type: SAVE_SERVICE_RESET });

export const ActionCreators = {
  fetchServiceRequest, fetchServiceFailure, fetchServiceSuccess,
  saveServiceRequest, saveServiceFailure, saveServiceSuccess, saveServiceReset
};

import { RequestStatuses as statuses } from "./requestStatuses";

const initialState = {
  fetchStatus: statuses.IDLE,
  saveStatus: statuses.IDLE,
  error: null,
  item: {}
};

export default function servicesFormReducer(state = initialState, action) {

  const { payload } = action;

  switch (action.type) {
    // запрос записи
    case FETCH_SERVICE_REQUEST:
      return { ...state, fetchStatus: statuses.PENDING, saveStatus: statuses.IDLE, item: {} };
    // ошибка получения записи
    case FETCH_SERVICE_FAILURE:
      return {
        ...state, fetchStatus: statuses.FAILURE, error: payload.message
      };
    // данные получены
    case FETCH_SERVICE_SUCCESS:
      return { ...state, fetchStatus: statuses.SUCCESS, item: payload.item };
    // запрос на сохранение данных
    case SAVE_SERVICE_REQUEST:
      return { ...state, saveStatus: statuses.PENDING };
    // ошибка сохранения записи
    case SAVE_SERVICE_FAILURE:
      return {
        ...state, saveStatus: statuses.FAILURE, error: payload.message
      };
    // запись сохранена
    case SAVE_SERVICE_SUCCESS:
      return { ...state, saveStatus: statuses.SUCCESS };
    // сброс результата сохранения
    case SAVE_SERVICE_RESET:
      return { ...state, saveStatus: statuses.IDLE };
    default:
      return state;
  };

};