import { createSlice } from "@reduxjs/toolkit";

// type Request = {
//   /** Статус запроса */
//   status: "pending" | "success" | "error";
//   /** Статус ответа */
//   statusCode?: number;
//   /** Сообщение об ошибке */
//   errorMessage?: string;
//   /** данные ответа */
//   data?: any;
// };

// type State = {
//   [key: string]: request
// };

// initialState: State
const initialState = {};

const requestsSlice = createSlice({
  initialState,
  name: "requests",
  reducers: {
    // запрос данных
    request: (state, action) => {
      const { path } = action.payload;
      return { ...state, [path]: { status: "pending" } };
    },
    // получение данных
    success: (state, action) => {
      const { path, statusCode, data } = action.payload;
      return { ...state, [path]: { status: "success", statusCode, data } };
    },
    // ошибка запроса
    error: (state, action) => {
      const { path, statusCode, errorMessage } = action.payload;
      return { ...state, [path]: { status: "error", statusCode, errorMessage } };
    },
    // удаление запросa
    complete: (state, action) => {
      const { [action.payload]: { }, ...newState } = state;
      return newState;
    }
  }
});

export const { request, success, error, complete } = requestsSlice.actions;
export default requestsSlice.reducer;