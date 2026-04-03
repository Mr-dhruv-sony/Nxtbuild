import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
  const token = Cookies.get('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const api = {
  get: (url) => axios.get(`${BASE_URL}${url}`, { headers: getHeaders() }),
  post: (url, data) => axios.post(`${BASE_URL}${url}`, data, { headers: getHeaders() }),
  put: (url, data) => axios.put(`${BASE_URL}${url}`, data, { headers: getHeaders() }),
  delete: (url) => axios.delete(`${BASE_URL}${url}`, { headers: getHeaders() }),
};

export default api;