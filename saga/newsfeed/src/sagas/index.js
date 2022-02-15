import { put, retry, spawn, takeEvery } from "redux-saga/effects";

import * as Api from "../api";

import { request, success, error } from "../store/requestSlice";

/**
 * Worker: обработка запросов
 * 
 * @param {{payload}} action 
 */
function* handleRequestSaga(action) {
  try {
    const data = yield retry(Number.MAX_SAFE_INTEGER, 3000, Api.fetch, action.payload);
    yield put(success(data));
  } catch (e) {
    yield put(error(e.message));
  }
}

/**
 * Watcher: ожидание запроса
 */
function* watchRequestSaga() {
  yield takeEvery(request.type, handleRequestSaga);
}

import * as PostMappers from "../utils/supplements";
import { append } from "../store/postsSlice";

/**
 * Worker: обработка постов
 * 
 * @param {{payload}} action 
 */
function* handleSuccessRequestSaga(action) {
  const posts = action.payload
    .map(PostMappers.appendPostAuthor) // данные об авторе
    .map(PostMappers.formatPostDate)   // дата публикации
    .map(PostMappers.transformAttachments) // обработка вложений
    .map(PostMappers.wrapViews) // количество просмотров
    .map(PostMappers.transformText); // обработка текста
  yield put(append(posts));
}

/**
 * Watcher: ожидание завершения запроса
 */
function* watchSuccessRequestSaga() {
  yield takeEvery(success.type, handleSuccessRequestSaga);
}

/**
 * Root saga
 */
export default function* saga() {
  yield spawn(watchRequestSaga);
  yield spawn(watchSuccessRequestSaga);
}