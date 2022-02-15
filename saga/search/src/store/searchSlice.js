import { createSlice } from "@reduxjs/toolkit";

/**
 * Cостояние простоя
 * @constant
 */
export const IDLE = "idle";
/**
 * Cостояние выполнения запроса
 * @constant
 */
export const PENDING = "pending";
/**
 * Запрос успешно выполнился
 * @constant
 */
export const SUCCESS = "success";
/**
 * Запрос завершился с ошибкой
 * @constant
 */
export const FAILURE = "failure";

const initialState = {
  /** результаты поиска */
  items: [],
  /** текущее состояние поиска */
  state: IDLE,
  /** текст ошибки */
  error: null,
  /** поисковый запрос */
  query: ""
};

/** Поиск */
const searchSlice = createSlice({
  initialState,
  name: "search",
  reducers: {
    /**
     * Изменение строки поиска
     * 
     * @param {*} state 
     * @param {{ payload: { query: string } }} action 
     */
    search: (state, action) => {
      const { query } = action.payload;
      state.query = query;
    },
    /**
     * Запрос к серверу
     * 
     * @param {*} state 
     */
    request: (state) => {
      state.state = PENDING;
    },
    /**
     * Ответ от сервера
     * 
     * @param {*} state 
     * @param {{payload: { items: object[] }}} action 
     */
    success: (state, action) => {
      const { items } = action.payload;
      state.state = SUCCESS;
      state.items = items;
      state.error = null;

    },
    /**
     * Ошибка запроса
     * 
     * @param {*} state 
     * @param {{ payload: { error: string } }} action 
     */
    error: (state, action) => {
      const { error } = action.payload;
      state.state = FAILURE;
      state.error = error;
    },
    /**
     * Сбросить состояние
     * 
     * @param {*} state 
     */
    reset: (state) => {
      state.state = IDLE;
      state.items = [];
      state.error = null;
    }
  }
});

export const { search, request, success, error, reset } = searchSlice.actions;
export default searchSlice.reducer;