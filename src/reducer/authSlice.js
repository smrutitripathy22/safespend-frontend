import { createSlice } from "@reduxjs/toolkit";

const loadUser = () => {
  try {
    const user = localStorage.getItem("safe-spend-user");
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error("Failed to parse user from localStorage", e);
    return null;
  }
};

const initialState = {
  user: loadUser(),
  token: localStorage.getItem("safe-spend-token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      localStorage.setItem("safe-spend-user", JSON.stringify(user));
      localStorage.setItem("safe-spend-token", token);
    },
    setUser:(state,action)=>{
          const user  = action.payload;
           state.user = user;


      localStorage.setItem("safe-spend-user", JSON.stringify(user));
    
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("safe-spend-user");
      localStorage.removeItem("safe-spend-token");
    },
  },
});

export const { login, logout,setUser } = authSlice.actions;
export default authSlice.reducer;
