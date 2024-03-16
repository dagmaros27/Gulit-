import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { loading: false, userInfo: {}, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("USER_LOGIN_REQUEST", (state) => {
      state.loading = true;
    });

    builder.addCase("USER_LOGIN_SUCCESS", (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    });

    builder.addCase("USER_LOGIN_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase("USER_LOGOUT", (state) => {
      state = {};
    });
  },
});

export const { reducer: user } = userSlice;
