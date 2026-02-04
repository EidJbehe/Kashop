import axios from 'axios';
import i18n from '../i18n';
import useAuthStore from '../assets/store/AuthStore';

const axiosInstance = axios.create({
  baseURL: 'https://knowledgeshop.runasp.net/api',
});


axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers['Accept-Language'] = i18n.language;

  return config;
});

export default axiosInstance;
