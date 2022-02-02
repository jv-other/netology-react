import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, Product } from "../types/product";
import productsSample from "./products_sample.json";

const initialState: ProductsState = {
  products: productsSample
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    save: (state: ProductsState, action: PayloadAction<Product>) => {
      const products = state.products;
      const newItem = { ...action.payload, id: action.payload.id || nanoid() };
      return {
        ...state,
        products: [...products, newItem]
      };
    }
  }
});

export default productsSlice.reducer;
export const { save } = productsSlice.actions;