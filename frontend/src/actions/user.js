import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { dispatch }) => {
    try {
      dispatch({ type: "USER_LOGIN_REQUEST" });
      console.log({ email, password });
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });

      localStorage.setItem("user-info", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("user-info");
    dispatch({ type: "USER_DETAILS_RESET" });
    dispatch({ type: "USER_LOGOUT" });
  }
);

export const register = createAsyncThunk(
  "user/login",
  async ({ name, email, password }, { dispatch }) => {
    try {
      dispatch({ type: "USER_REGISTER_REQUEST" });

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/",
        { name, email, password },
        config
      );

      dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });

      dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });

      localStorage.setItem("user-info", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);

export const getuserDetails = createAsyncThunk(
  "user/getDetails",
  async (_, { dispatch, getState }) => {
    try {
      dispatch({ type: "USER_DETAILS_REQUEST" });

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + getState().user.userInfo.token,
        },
      };

      const { data } = await axios.get(`/api/user/profile`, config);

      dispatch({ type: "USER_DETAILS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "USER_DETAILS_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateProfile",
  async (user, { dispatch, getState }) => {
    try {
      dispatch({ type: "USER_UPDATE_REQUEST" });

      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + getState().user.userInfo.token,
        },
      };

      const { data } = await axios.put(`/api/user/profile`, user, config);

      dispatch({ type: "USER_UPDATE_SUCCESS", payload: data });
      localStorage.setItem("user-info", JSON.stringify(data));
      dispatch({ type: "USER_DETAILS_RESET" });
    } catch (error) {
      dispatch({
        type: "USER_UPDATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
);
