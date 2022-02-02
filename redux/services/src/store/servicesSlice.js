import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedId: null,
  list: [
    { id: 1, name: "Замена стекла", price: 21000 },
    { id: 2, name: "Замена дисплея", price: 25000 },
    { id: 3, name: "Замена дисплея", price: 4000 },
    { id: 4, name: "Замена дисплея", price: 2500 }
  ]
};

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    save: (state, action) => {
      const services = state.list;
      const newItem = { ...action.payload, id: action.payload.id || window.crypto.randomUUID() };
      const index = (services.findIndex(item => newItem.id === item.id) + 1) || (services.length + 1);
      return {
        ...state,
        list: [
          ...services.slice(0, index - 1),
          newItem,
          ...services.slice(index)
        ],
        selectedId: null
      };
    },
    remove: (state, action) => {
      const itemId = action.payload;
      return {
        ...state,
        list: state.list.filter(item => itemId !== item.id),
        ...((state.selectedId === itemId) ? { selectedId: null } : [])
      };
    },
    select: (state, action) => {
      return { ...state, selectedId: action.payload };
    }
  }
});

export const { save, remove, select } = servicesSlice.actions;
export default servicesSlice.reducer;