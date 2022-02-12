import { delay, map, mergeMap, of, retryWhen, switchMap, tap } from "rxjs";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";

import { request, success, error } from "../store/requestSlice";


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
    retryWhen(errors => errors.pipe(                    // в случае ошибки повтор через 3 секунды
      tap(err =>
        console.warn("Request failed, retry..", err)),
      delay(3000)
    ))
  ))
);

import * as PostMappers from "../utils/supplements";
import { append } from "../store/postsSlice";

/**
 * Обработчик постов
 * 
 * @function
 * @param {*} action$ 
 * 
 */
export const appendPostsEpic = action$ => action$.pipe(
  ofType(success.type),
  mergeMap(action => of(...action.payload).pipe(
    map(PostMappers.appendPostAuthor),                  // данные об авторе
    map(PostMappers.formatPostDate),                    // дата публикации
    map(PostMappers.transformAttachments),              // обработка вложений
    map(PostMappers.wrapViews),                         // количество просмотров
    map(PostMappers.transformText),                     // обработка текста
    map(post => append([post]))                         // добавление поста
  ))
);