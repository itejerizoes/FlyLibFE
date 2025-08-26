import {
  getUsers,
  getUserByEmail,
  getRoles,
  assignRole,
  removeRole,
  createRole,
  deleteRole
} from '../../api/manageruserrole';
import api from '../../api/axios';

jest.mock('../../api/axios');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('manageruserrole API', () => {
  test('getUsers retorna la lista de usuarios con roles', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: [{ email: 'test@test.com', roles: ['Admin'] }] });
    const result = await getUsers();
    expect(api.get).toHaveBeenCalledWith('/ManageUsers/users');
    expect(result).toEqual([{ email: 'test@test.com', roles: ['Admin'] }]);
  });

  test('getUserByEmail retorna el usuario por email', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { email: 'user@test.com', roles: ['User'] } });
    const result = await getUserByEmail('user@test.com');
    expect(api.get).toHaveBeenCalledWith('/ManageUsers/user/user@test.com');
    expect(result).toEqual({ email: 'user@test.com', roles: ['User'] });
  });

  test('getRoles retorna la lista de roles', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: ['Admin', 'User'] });
    const result = await getRoles();
    expect(api.get).toHaveBeenCalledWith('/ManageUsers/roles');
    expect(result).toEqual(['Admin', 'User']);
  });

  test('assignRole asigna un rol a un usuario', async () => {
    const data = { userEmail: 'user@test.com', role: 'Admin' };
    (api.post as jest.Mock).mockResolvedValue({ data: { success: true } });
    const result = await assignRole(data);
    expect(api.post).toHaveBeenCalledWith('/ManageUsers/assign-role', data);
    expect(result).toEqual({ success: true });
  });

  test('removeRole elimina un rol de un usuario', async () => {
    const data = { userEmail: 'user@test.com', role: 'User' };
    (api.post as jest.Mock).mockResolvedValue({ data: { success: true } });
    const result = await removeRole(data);
    expect(api.post).toHaveBeenCalledWith('/ManageUsers/remove-role', data);
    expect(result).toEqual({ success: true });
  });

  test('createRole crea un nuevo rol', async () => {
    const data = { role: 'Editor' };
    (api.post as jest.Mock).mockResolvedValue({ data: { success: true } });
    const result = await createRole(data);
    expect(api.post).toHaveBeenCalledWith('/ManageUsers/create-role', data);
    expect(result).toEqual({ success: true });
  });

  test('deleteRole elimina un rol', async () => {
    const data = { role: 'Editor' };
    (api.post as jest.Mock).mockResolvedValue({ data: { success: true } });
    const result = await deleteRole(data);
    expect(api.post).toHaveBeenCalledWith('/ManageUsers/delete-role', data);
    expect(result).toEqual({ success: true });
  });
});