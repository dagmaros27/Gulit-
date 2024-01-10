// reducers/product.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const listProducts = createAsyncThunk(
  "productList/listProducts",
  async (_, { dispatch }) => {
    try {
      dispatch({ type: "PRODUCT_LIST_REQUEST" });

      const { data } = await axios.get("/api/products/");

      dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "PRODUCT_LIST_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);
