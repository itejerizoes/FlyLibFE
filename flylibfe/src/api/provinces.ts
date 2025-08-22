import { Province, ProvinceCreate, ProvinceUpdate } from '../types/province';
import api from './axios';

export const getProvinces = async (): Promise<Province[]> => {
  const res = await api.get<Province[]>('/v1/Provinces');
  return res.data;
};

export const getProvinceById = async (id: number): Promise<Province> => {
  const res = await api.get<Province>(`/v1/Provinces/${id}`);
  return res.data;
};

export const getProvinceByName = async (name: string): Promise<Province> => {
  const res = await api.get<Province>(`/v1/Provinces/byName/${name}`);
  return res.data;
};

export const createProvince = async (data: ProvinceCreate): Promise<Province> => {
  const res = await api.post<Province>('/v1/Provinces', data);
  return res.data;
};

export const updateProvince = async (id: number, data: ProvinceUpdate): Promise<void> => {
  await api.put(`/v1/Provinces/${id}`, data);
};

export const deleteProvince = async (id: number): Promise<void> => {
  await api.delete(`/v1/Provinces/${id}`);
};