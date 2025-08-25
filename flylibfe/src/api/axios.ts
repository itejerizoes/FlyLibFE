import axios from 'axios';

// Configura la URL base de tu API .NET 9
const api = axios.create({
  baseURL: 'https://localhost:7157/api', // Cambia esto si tu backend está en otra URL/puerto
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expirado
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;