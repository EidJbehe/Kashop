import axios from 'axios';
import useAuthStore from '../assets/store/AuthStore';
import i18n from '../i18n';

// Base URL
const BASE_URL = 'https://knowledgeshop.runasp.net/api';

// Axios instance for authenticated requests
const axiosAuthInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Axios instance for refresh token
const axiosRefresh = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

/* REQUEST INTERCEPTOR */
axiosAuthInstance.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Accept-Language'] = i18n.language;
    config.headers.Accept = 'application/json';

    return config;
  },
  (error) => Promise.reject(error)
);

/* RESPONSE INTERCEPTOR */
axiosAuthInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Network / CORS / Server down
    if (!error.response) {
      return Promise.reject({
        message: 'Network Error',
        originalError: error,
      });
    }

    // Handle 401 (Access Token expired)
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('RefreshToken')
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axiosRefresh.post(
          '/auth/Account/RefreshToken',
          {}
        );

        const newAccessToken = refreshResponse.data?.accessToken;

        if (!newAccessToken) {
          throw new Error('No access token returned');
        }

        // Save new token in store
        useAuthStore.getState().setToken(newAccessToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosAuthInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token expired or invalid
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    // Other backend errors (400, 403, 500...)
    return Promise.reject(error);
  }
);

export default axiosAuthInstance;
