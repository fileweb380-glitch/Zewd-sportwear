import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ephrem-zewdsport.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

// Request interceptor to attach JWT token and handle FormData headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('zewd_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Let browser/Axios set multipart/form-data boundary automatically for FormData
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;