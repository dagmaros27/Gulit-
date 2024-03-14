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
