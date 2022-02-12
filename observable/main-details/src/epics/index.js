import { catchError, map, mergeMap, of, repeatWhen, retryWhen, switchMap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";

import { request, success, error, retry } from "../store/requestSlice";

/**
 * API url
 * @constant
 * 
 */
const API_URL = process.env.REACT_APP_API_URL;

/**
 * Обработчик запроса
 * 
 * @function
 * @param {*} action$ 
 * 
 */
export const handleRequestEpic = action$ => action$.pipe(
  ofType(request.type),
  map(action => action.payload),                        // получение api resource
  map(resource => [API_URL, resource].join("/")),       // получение request url
  switchMap(url => ajax.getJSON(url).pipe(              // выполнение запроса
    map(response => success(response)),                 // action.success
    catchError(err => of(error(err))),                  // action.error
    repeatWhen(() => action$.pipe(ofType(retry.type)))  // повторить если action.retry
  ))
);
