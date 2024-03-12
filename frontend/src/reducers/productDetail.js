// reducers/productDetail.js
import { createSlice } from "@reduxjs/toolkit";

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: { loading: false, product: { reviews: [] }, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase("PRODUCT_DETAIL_REQUEST", (state) => {
        state.loading = true;
      })
      .addCase("PRODUCT_DETAIL_SUCCESS", (state, action) => {
        state.loading = false;
        state.product = action.payload; // Fix the assignment here
      })
      .addCase("PRODUCT_DETAIL_FAIL", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: productDetail } = productDetailSlice;
