import { createSlice } from "@reduxjs/toolkit";
import { error } from "./requestsSlice";

const initialState = {
  // user token
  token: window.localStorage.getItem("token"),
  // user profile
  profile: null
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    // авторизация
    auth: (state, action) => {
      const { token } = action.payload;
      return { ...state, token };
    },
    // выход
    logout: (state, ation) => ({ ...state, token: null, profile: null }),
    // данные профиля
    setProfile: (state, action) => {
      const { profile } = action.payload;
      return { ...state, profile };
    }
  },
  extraReducers: {
    // если получена ошибка 401
    [error]: (state, action) => {
      const { statusCode } = action.payload;
      if (401 === statusCode) {
        state.token = null;
        state.profile = null;
      }
    }
  }
});

export const { auth, logout, setProfile } = authSlice.actions;
export default authSlice.reducer;