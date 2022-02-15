import { call, put, spawn, take, takeEvery } from "redux-saga/effects";

import * as Api from "../api";

import { request, success, error, retry } from "../store/requestSlice";

/**
 * Worker: обработка запросов
 * 
 * @param {{payload}} action 
 */
function* handleRequestSaga(action) {
  while (true) {
    try {
      const data = yield call(Api.fetch, action.payload);
      yield put(success(data));
    } catch (e) {
      yield put(error(e.message));
      yield take(retry.type);
      continue;
    }
    break;
  }
}

/**
 * Watcher: ожидание запроса
 */
function* watchRequestSaga() {
  yield takeEvery(request.type, handleRequestSaga);
}

/**
 * Root saga
 */
export default function* saga() {
  yield spawn(watchRequestSaga);
}