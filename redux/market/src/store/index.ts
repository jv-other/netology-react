import { createStore } from "redux";
import productsReducer from "./productsSlice";
import { ProductsState } from "../types/product";

// store
export default createStore(
  productsReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

// products selector from state
export const productsSelector = (state: ProductsState) => state.products;