import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  /** Загруженные посты */
  posts: []
};

const postsSlice = createSlice({
  initialState,
  name: "posts",
  reducers: {
    /**
     * Добавление загруженных постов
     * 
     * @param {*} state 
     * @param {{ payload: object[] }} action.payload Массив постов
     */
    append: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    }
  }
})

export const { append } = postsSlice.actions;
export default postsSlice.reducer;