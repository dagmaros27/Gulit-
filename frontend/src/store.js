import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productList } from "./reducers/product";
import { productDetail } from "./reducers/productDetail";
import { cart } from "./reducers/cart";
import { user, userDetails } from "./reducers/user";

const reducer = combineReducers({
  productList: productList,
  productDetail: productDetail,
  cart: cart,
  user: user,
  userDetails: userDetails,
});
const cartItems = localStorage.getItem("cart-items")
  ? JSON.parse(localStorage.getItem("cart-items"))
  : [];

const userInfo = localStorage.getItem("user-info")
  ? JSON.parse(localStorage.getItem("user-info"))
  : null;

const shippingAddress = localStorage.getItem("shipping-address")
  ? JSON.parse(localStorage.getItem("shipping-address"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItems,
    shippingAddress: shippingAddress,
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
  user: { userInfo: userInfo },
};
export default configureStore({
  reducer: reducer,
  preloadedState: initialState,
});
