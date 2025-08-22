import { UserRole, AssignRoleRequest, RoleRequest } from '../types/manageUserRole';
import api from './axios';

export const getUsers = async (): Promise<UserRole[]> => {
  const res = await api.get<UserRole[]>('/ManageUsers/users');
  return res.data;
};

export const getUserByEmail = async (email: string): Promise<UserRole> => {
  const res = await api.get<UserRole>(`/ManageUsers/user/${email}`);
  return res.data;
};

export const getRoles = async (): Promise<string[]> => {
  const res = await api.get<string[]>('/ManageUsers/roles');
  return res.data;
};

export const assignRole = async (data: AssignRoleRequest): Promise<any> => {
  const res = await api.post('/ManageUsers/assign-role', data);
  return res.data;
};

export const removeRole = async (data: AssignRoleRequest): Promise<any> => {
  const res = await api.post('/ManageUsers/remove-role', data);
  return res.data;
};

export const createRole = async (data: RoleRequest): Promise<any> => {
  const res = await api.post('/ManageUsers/create-role', data);
  return res.data;
};

export const deleteRole = async (data: RoleRequest): Promise<any> => {
  const res = await api.post('/ManageUsers/delete-role', data);
  return res.data;
};