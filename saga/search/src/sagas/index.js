import { call, debounce, put, race, spawn, take, takeLatest } from "redux-saga/effects";

import { search, request, success, error, reset, IDLE } from "../store/searchSlice";

import * as Api from "../api";

/**
 * Worker: обработка изменения поисковой строки
 * 
 * @param {{payload}} action 
 */
function* handleChangeSearchSaga(action) {
  const query = action.payload.query;
  yield put(query ? request(query) : reset());
}

/**
 * Watcher: событие изменения поисковой строки 
 */
function* watchChangeSearchSaga() {
  yield debounce(300, ({ type }) => search.type === type, handleChangeSearchSaga);
}

/**
 * Worker: обработка запросов
 * 
 * @param {{payload}} action 
 */
function* handleSearchRequestSaga(action) {
  try {
    const { data, cancel } = yield race({
      data: call(Api.search, action.payload),
      cancel: take(reset.type)
    });
    if (data && !cancel) {
      yield put(success({ items: data }));
    }
  } catch (e) {
    yield put(error({ error: e.message }));
  }
}

/**
 * Watcher: ожидание событий поискового запроса
 */
function* watchSearchRequestSaga() {
  yield takeLatest(request.type, handleSearchRequestSaga);
}

/**
 * Root saga
 */
export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchRequestSaga);
}