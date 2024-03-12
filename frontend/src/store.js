import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productList } from "./reducers/product";
import { productDetail } from "./reducers/productDetail";

const reducer = combineReducers({
  productList: productList,
  productDetail: productDetail,
});

export default configureStore({ reducer: reducer });
