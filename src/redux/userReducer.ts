import { createSlice } from "@reduxjs/toolkit";

const userReducerSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loggedIn: false,
    token: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loggedIn = true;
      state.token = action.payload.accessToken;
    },
    loginFailure: (state) => {
      state.user = null;
      state.loggedIn = false;
      state.token = null;
    },
  },
});
export const { loginFailure, loginSuccess, logout } = userReducerSlice.actions;
export default userReducerSlice.reducer;