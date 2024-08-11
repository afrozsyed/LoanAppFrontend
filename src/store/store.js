import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    // reducers are added here
    auth: authSlice,
  },
});

export default store;