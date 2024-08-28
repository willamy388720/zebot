import axios from "axios";
import { getToken, refreshToken, signOut } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

api.interceptors.request.use((request) => {
  const headers = request.headers ?? {};

  const token = getToken();

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  request.headers = headers;

  return request;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await refreshToken();
        const { token } = response.data;

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        signOut();
      }
    }

    return Promise.reject(error);
  }
);

export { api };
