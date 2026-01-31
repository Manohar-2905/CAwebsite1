import axios from "axios";
import API_BASE_URL from "../config/api";

const api = axios.create({
  baseURL: API_BASE_URL || "https://back.dasguptamaitiassociates.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
