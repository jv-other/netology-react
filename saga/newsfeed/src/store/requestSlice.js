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
  /** Статус запроса */
  status: IDLE,
  /** Результат успешного выполнения запроса */
  data: []
};

const requestSlice = createSlice({
  initialState,
  name: "request",
  reducers: {
    /**
     * Создать запрос
     * 
     * @param {*} state
     * @param {{ payload: string }} action.payload Request API resource 
     */
    request: (state, action) => {
      state.status = PENDING;
    },
    /**
     * Успешное выполнение запроса
     * 
     * @param {*} state 
     * @param {{ payload: * }} action.paylod Response data
     */
    success: (state, action) => {
      state.status = SUCCESS;
      state.data = action.payload;
    },
    /**
     * Ошибка выполнения запроса
     * 
     * @param {*} state 
     */
    error: (state) => {
      state.status = FAILURE;
    }
  }
});

export const { request, success, error } = requestSlice.actions;
export default requestSlice.reducer;