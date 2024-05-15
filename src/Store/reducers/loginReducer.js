import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isAuthenticated: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.tasks = [];

      if (Object.values(action.payload).length > 0)
        state.users = action.payload;
    },
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { addUser, loginSuccess, logout } = loginSlice.actions;

export default loginSlice.reducer;
