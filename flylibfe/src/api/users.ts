import { User, UserCreate, UserUpdate } from '../types/user';
import api from './axios';

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get<User[]>('/v1/Users');
  return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await api.get<User>(`/v1/Users/${id}`);
  return res.data;
};

export const createUser = async (data: UserCreate): Promise<User> => {
  const res = await api.post<User>('/v1/Users', data);
  return res.data;
};

export const updateUser = async (id: string, data: UserUpdate): Promise<void> => {
  await api.put(`/v1/Users/${id}`, data);
};

export const deleteUser = async (id: string): Promise<void> => {
  await api.delete(`/v1/Users/${id}`);
};