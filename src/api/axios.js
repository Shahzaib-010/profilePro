import axios from "axios";

const api = axios.create({
  baseURL: "https://profile-pro-api.chfarhanliaqat.site/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Automatically attach token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If any request gets 401 (token expired/invalid), auto logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
