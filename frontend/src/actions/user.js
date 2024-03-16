import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { dispatch }) => {
    try {
      dispatch({ type: "USER_LOGIN_REQUEST" });
      console.log({ email, password });
      const config = {
        Headers: {
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
