import { Visited, VisitedCreate, VisitedUpdate } from '../types/visited';
import api from './axios';

export const getVisiteds = async (): Promise<Visited[]> => {
  const res = await api.get<Visited[]>('/v1/Visiteds');
  return res.data;
};

export const getVisitedById = async (id: number): Promise<Visited> => {
  const res = await api.get<Visited>(`/v1/Visiteds/${id}`);
  return res.data;
};

export const createVisited = async (data: VisitedCreate): Promise<Visited> => {
  const res = await api.post<Visited>('/v1/Visiteds', data);
  return res.data;
};

export const updateVisited = async (id: number, data: VisitedUpdate): Promise<void> => {
  await api.put(`/v1/Visiteds/${id}`, data);
};

export const deleteVisited = async (id: number): Promise<void> => {
  await api.delete(`/v1/Visiteds/${id}`);
};