import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../../api/users';
import api from '../../api/axios';

jest.mock('../../api/axios');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('users API', () => {
  test('getUsers retorna la lista de usuarios', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: [{ id: '1', displayName: 'Test User' }] });
    const result = await getUsers();
    expect(api.get).toHaveBeenCalledWith('/v1/Users');
    expect(result).toEqual([{ id: '1', displayName: 'Test User' }]);
  });

  test('getUserById retorna el usuario por id', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: { id: '2', displayName: 'User2' } });
    const result = await getUserById('2');
    expect(api.get).toHaveBeenCalledWith('/v1/Users/2');
    expect(result).toEqual({ id: '2', displayName: 'User2' });
  });

  test('createUser crea un usuario y retorna el usuario creado', async () => {
    const userData = { displayName: 'Nuevo', email: 'nuevo@test.com', password: '123456', authProvider: 'local' };
    (api.post as jest.Mock).mockResolvedValue({ data: { id: '3', ...userData } });
    const result = await createUser(userData);
    expect(api.post).toHaveBeenCalledWith('/v1/Users', userData);
    expect(result).toEqual({ id: '3', ...userData });
  });

  test('updateUser actualiza un usuario', async () => {
    const userUpdate = { id: '4', displayName: 'Actualizado', email: 'actualizado@test.com', authProvider: 'local' };
    (api.put as jest.Mock).mockResolvedValue({});
    await updateUser('4', userUpdate);
    expect(api.put).toHaveBeenCalledWith('/v1/Users/4', userUpdate);
  });

  test('deleteUser elimina un usuario', async () => {
    (api.delete as jest.Mock).mockResolvedValue({});
    await deleteUser('5');
    expect(api.delete).toHaveBeenCalledWith('/v1/Users/5');
  });
});