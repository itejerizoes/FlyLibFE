import { Photo, PhotoCreate, PhotoUpdate } from '../types/photo';
import api from './axios';

export const getPhotos = async (): Promise<Photo[]> => {
  const res = await api.get<Photo[]>('/v1/Photos');
  return res.data;
};

export const getPhotoById = async (id: number): Promise<Photo> => {
  const res = await api.get<Photo>(`/v1/Photos/${id}`);
  return res.data;
};

export const createPhoto = async (data: PhotoCreate): Promise<Photo> => {
  const res = await api.post<Photo>('/v1/Photos', data);
  return res.data;
};

export const updatePhoto = async (id: number, data: PhotoUpdate): Promise<void> => {
  await api.put(`/v1/Photos/${id}`, data);
};

export const deletePhoto = async (id: number): Promise<void> => {
  await api.delete(`/v1/Photos/${id}`);
};