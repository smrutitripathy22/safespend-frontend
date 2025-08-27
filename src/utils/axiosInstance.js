import axios from "axios";
import { store } from "../reducer/store";
import { logout } from "../reducer/authSlice";
import { isTokenExpired } from "./tokenValidity";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("safe-spend-token");

  if (token) {
    if (isTokenExpired(token)) {
      store.dispatch(logout());
      window.location.href = "/login";
      return Promise.reject(new Error("Token expired"));
    }
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
