// src/redux/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      const { username, email, password } = action.payload;
      const existingUser = state.users.find((user) => user.email === email);

      if (!existingUser) {
        state.users.push({ username, email, password });
      }
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = state.users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        state.user = user;
        state.isLoggedIn = true;
      }
    },
    updatePassword: (state, action) => {
      const { username, newPassword } = action.payload;
      const user = state.users.find((u) => u.username === username);
      if (user) {
        user.password = newPassword;
      }
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { register, login, logout, updatePassword } = authSlice.actions;
export default authSlice.reducer;
