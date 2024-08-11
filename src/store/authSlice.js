import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  userRole: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogin: (state, action) => {
      const { user, refreshToken } = action.payload;
      console.log("in auth slice Login:::",user, refreshToken);
      console.log("in auth slice Login:userRole::", user.role);
      state.user = user;
      state.isAuthenticated = true;
      state.userRole = user.role;
      state.token = refreshToken;
    },
    authLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.userRole = null;
      state.token = null;
    },
  },
});

export const { authLogin, authLogout } = authSlice.actions;
export default authSlice.reducer;