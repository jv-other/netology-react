import { catchError, debounceTime, filter, first, map, of, switchMap, takeUntil, takeWhile } from "rxjs";
import { ajax } from "rxjs/ajax";
import { ofType } from "redux-observable";
import { search, request, success, error, reset, IDLE } from "../store/searchSlice";

/**
 * API url
 * @constant
 * 
 */
const API_URL = process.env.REACT_APP_API_URL;

/**
 * При изменении поисковой строки созадает запрос к серверу.
 * Если строка поиска пустая - возвращает пустой результат
 * 
 * @function
 * @param {*} action$ 
 * 
 */
export const changeSearchEpic = action$ => action$.pipe(
  ofType(search.type),
  map(action => action.payload.query),
  debounceTime(300),
  map(query => query ? request({ q: query }) : reset())
);

/**
 * Обработчик запроса к серверу
 * 
 * @function
 * @param {*} action$ 
 * @param {*} state$ 
 *  
 */
export const searchRequestEpic = (action$, state$) => action$.pipe(
  ofType(request.type),
  map(action => action.payload),
  map(query => new URLSearchParams(query)),
  switchMap(params => ajax.getJSON(`${API_URL}/search?${params}`).pipe(
    takeUntil(state$.pipe(
      map(state => state.search.state),
      filter(state => IDLE === state)
    )),
    map(response => success({ items: response })),
    catchError(err => of(error({ error: err.message })))
  ))
);