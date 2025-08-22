import axios from 'axios';

// Configura la URL base de tu API .NET 9
const api = axios.create({
  baseURL: 'https://localhost:7157/api', // Cambia esto si tu backend está en otra URL/puerto
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token JWT si existe
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;