import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productList } from "./reducers/product";
import { productDetail } from "./reducers/productDetail";
import { cart } from "./reducers/cart";

const reducer = combineReducers({
  productList: productList,
  productDetail: productDetail,
  cart: cart,
});
const cartItems = localStorage.getItem("cart-items")
  ? JSON.parse(localStorage.getItem("cart-items"))
  : [];

const initialState = {
  cart: { cartItems: cartItems },
};
export default configureStore({
  reducer: reducer,
  preloadedState: initialState,
});
