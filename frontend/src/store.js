import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { productList } from "./reducers/product";

const reducer = combineReducers({ productList: productList });

export default configureStore({ reducer: reducer });
