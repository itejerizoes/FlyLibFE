import { Country, CountryCreate, CountryUpdate } from '../types/country';
import api from './axios';

export const getCountries = async (): Promise<Country[]> => {
  const res = await api.get<Country[]>('/v1/Countries');
  return res.data;
};

export const getCountryById = async (id: number): Promise<Country> => {
  const res = await api.get<Country>(`/v1/Countries/${id}`);
  return res.data;
};

export const getCountryByName = async (name: string): Promise<Country> => {
  const res = await api.get<Country>(`/v1/Countries/byName/${name}`);
  return res.data;
};

export const createCountry = async (data: CountryCreate): Promise<Country> => {
  const res = await api.post<Country>('/v1/Countries', data);
  return res.data;
};

export const updateCountry = async (id: number, data: CountryUpdate): Promise<void> => {
  await api.put(`/v1/Countries/${id}`, data);
};

export const deleteCountry = async (id: number): Promise<void> => {
  await api.delete(`/v1/Countries/${id}`);
};