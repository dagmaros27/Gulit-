import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const addToCart = createAsyncThunk(
  "addToCart",
  async ({ id, quantity }, { dispatch, getState }) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch({
        type: "CART_ADD_ITEM",
        payload: {
          product: data._id,
          name: data.name,
          price: data.price,
          image: data.image,
          countInStock: data.countInStock,
          quantity,
        },
      });

      localStorage.setItem(
        "cart-items",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "removeFromCart",
  async (id, { dispatch, getState }) => {
    try {
      dispatch({
        type: "CART_REMOVE_ITEM",
        payload: id,
      });

      localStorage.setItem(
        "cart-items",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const saveShippingAddress = createAsyncThunk(
  "saveShippingAddress",
  async (data, { dispatch }) => {
    try {
      dispatch({
        type: "CART_SAVE_SHIPPING_ADDRESS",
        payload: data,
      });

      localStorage.setItem("shipping-address", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const savePaymentMethod = createAsyncThunk(
  "savePaymentMethod",
  async (data, { dispatch }) => {
    try {
      dispatch({
        type: "CART_SAVE_PAYMENT_METHOD",
        payload: data,
      });

      localStorage.setItem("payment-method", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPrices = createAsyncThunk(
  "calculatePrices",
  async (data, { dispatch }) => {
    try {
      dispatch({
        type: "GET_PRICES",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  }
);
