import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("CART_ADD_ITEM", (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
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

    builder.addCase("CART_REMOVE_ITEM", (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };
    });

    builder.addCase("CART_SAVE_SHIPPING_ADDRESS", (state, action) => {
      return {
        ...state,
        shippingAddress: action.payload,
      };
    });
    builder.addCase("CART_SAVE_PAYMENT_METHOD", (state, action) => {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    });

    builder.addCase("GET_PRICES", (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});

export const { reducer: cart } = cartSlice;
