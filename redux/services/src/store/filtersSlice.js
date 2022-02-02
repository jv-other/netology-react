import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: ""
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filter: (state, action) => {
      return { ...state, name: action.payload };
    }
  }
});

export const { filter } = filtersSlice.actions;
export default filtersSlice.reducer;