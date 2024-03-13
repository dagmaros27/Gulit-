import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("CART_ADD_ITEM", (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    });
  },
});

export const { reducer: cart } = cartSlice;
