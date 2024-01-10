// reducers/product.js
import { listProducts } from "../actions/product";
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productList",
  initialState: { loading: false, products: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase("PRODUCT_LIST_REQUEST", (state) => {
        state.loading = true;
      })
      .addCase("PRODUCT_LIST_SUCCESS", (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase("PRODUCT_LIST_FAIL", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: productList } = productSlice;
