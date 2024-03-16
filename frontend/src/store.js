import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productList } from "./reducers/product";
import { productDetail } from "./reducers/productDetail";
import { cart } from "./reducers/cart";
import { user } from "./reducers/user";

const reducer = combineReducers({
  productList: productList,
  productDetail: productDetail,
  cart: cart,
  user: user,
});
const cartItems = localStorage.getItem("cart-items")
  ? JSON.parse(localStorage.getItem("cart-items"))
  : [];

const userInfo = localStorage.getItem("user-info")
  ? JSON.parse(localStorage.getItem("user-info"))
  : null;

const initialState = {
  cart: { cartItems: cartItems },
  user: { userInfo: userInfo },
};
export default configureStore({
  reducer: reducer,
  preloadedState: initialState,
});
