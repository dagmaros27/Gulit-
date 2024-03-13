import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const productDetail = createAsyncThunk(
  "productDetail/productDetail",
  async (id, { dispatch }) => {
    console.log("ProductDetail");
    try {
      dispatch({ type: "PRODUCT_DETAIL_REQUEST" });

      const { data } = await axios.get(`/api/products/${id}`);

      dispatch({ type: "PRODUCT_DETAIL_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "PRODUCT_DETAIL_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);
