// action creators for list
import { ActionCreators as lac } from "../store/servicesListReducer";
// action creators for form
import { ActionCreators as fac } from "../store/servicesFormReducer";

const API_URL = process.env.REACT_APP_API_URL;

import store from "../store";
const dispatch = store.dispatch;

/**
 * Получение списка услуг
 * 
 */
const getServices = async () => {
  try {
    dispatch(lac.fetchServicesRequest());
    const response = await window.fetch([API_URL, "services"].join("/"));
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const items = await response.json();
    dispatch(lac.fetchServicesSuccess(items));
  } catch (err) {
    dispatch(lac.fetchServicesFailure(err.message));
  }
};

/**
 * Удаление записи услуги
 * 
 * @param {string} serviceId Идентификатор удаляемой записи 
 */
const removeService = async (serviceId) => {
  try {
    dispatch(lac.removeServiceRequest(serviceId));
    const response = await window.fetch([API_URL, "services", serviceId].join("/"), {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(lac.removeServiceSuccess(serviceId));
  } catch (err) {
    dispatch(lac.removeServiceFailure(serviceId, err.message));
  }
};

/**
 * Получение данных услуги
 * 
 * @param {string} serviceId Идентификатор запрашиваемой записи 
 */
const getService = async (serviceId) => {
  try {
    dispatch(fac.fetchServiceRequest());
    const response = await window.fetch([API_URL, "services", serviceId].join("/"));
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const item = await response.json();
    dispatch(fac.fetchServiceSuccess(item));
  } catch (err) {
    dispatch(fac.fetchServiceFailure(err.message));
  }
};

/**
 * Сохранение записи услуги
 * 
 * @param {object} item Сохраняемая запись 
 */
const saveService = async (item) => {
  try {
    dispatch(fac.saveServiceRequest(item));
    const response = await window.fetch([API_URL, "services"].join("/"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(fac.saveServiceSuccess());
  } catch (err) {
    dispatch(fac.saveServiceFailure(err.message));
  }
};

export { getServices, getService, saveService, removeService };