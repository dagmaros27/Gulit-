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
      state.error = null;
    });

    builder.addCase("USER_LOGIN_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase("USER_LOGOUT", (state) => {
      state.userInfo = null;
    });

    builder.addCase("USER_REGISTER_REQUEST", (state) => {
      state.loading = true;
    });

    builder.addCase("USER_REGISTER_SUCCESS", (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    });

    builder.addCase("USER_REGISTER_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase("USER_UPDATE_REQUEST", (state) => {
      state.loading = true;
    });

    builder.addCase("USER_UPDATE_SUCCESS", (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    });

    builder.addCase("USER_UPDATE_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

const userDetailSlice = createSlice({
  name: "userDetails",
  initialState: { loading: false, userDetails: {}, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase("USER_DETAILS_REQUEST", (state) => {
      state.loading = true;
    });

    builder.addCase("USER_DETAILS_SUCCESS", (state, action) => {
      state.loading = false;
      state.userDetails = action.payload;
      state.error = null;
    });

    builder.addCase("USER_DETAILS_FAIL", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase("USER_DETAILS_RESET", (state) => {
      state.userDetails = {};
    });
  },
});

export const { reducer: user } = userSlice;

export const { reducer: userDetails } = userDetailSlice;
