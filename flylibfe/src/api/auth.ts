import api from './axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  displayName?: string;
  roles?: string[]; // <-- Agrega esto
}

export interface RegisterRequest {
  displayName: string;
  email: string;
  password: string;
}

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/Auth/login', data);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  if (response.data.displayName) {
    localStorage.setItem('displayName', response.data.displayName);
  }
  if (response.data.roles) {
    localStorage.setItem('roles', JSON.stringify(response.data.roles)); // <-- Guarda los roles
  }
  return response.data;
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token found');
  const response = await api.post<AuthResponse>('/Auth/refresh', { refreshToken });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  if (response.data.roles) {
    localStorage.setItem('roles', JSON.stringify(response.data.roles)); // <-- Guarda los roles también en refresh
  }
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<void> => {
  await api.post('/Auth/register', data);
};