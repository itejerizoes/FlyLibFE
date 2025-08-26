import { login, refreshToken, register } from '../../api/auth';
import api from '../../api/axios';

jest.mock('../../api/axios');

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('auth API', () => {
  test('login guarda token, refreshToken, displayName y roles en localStorage', async () => {
    (api.post as jest.Mock).mockResolvedValue({
      data: {
        token: 'token123',
        refreshToken: 'refresh123',
        displayName: 'Test User',
        roles: ['Admin', 'User'],
      },
    });

    const result = await login({ email: 'test@test.com', password: '123456' });

    expect(api.post).toHaveBeenCalledWith('/Auth/login', { email: 'test@test.com', password: '123456' });
    expect(localStorage.getItem('token')).toBe('token123');
    expect(localStorage.getItem('refreshToken')).toBe('refresh123');
    expect(localStorage.getItem('displayName')).toBe('Test User');
    expect(localStorage.getItem('roles')).toBe(JSON.stringify(['Admin', 'User']));
    expect(result.token).toBe('token123');
    expect(result.roles).toEqual(['Admin', 'User']);
  });

  test('refreshToken guarda token, refreshToken y roles en localStorage', async () => {
    localStorage.setItem('refreshToken', 'refresh123');
    (api.post as jest.Mock).mockResolvedValue({
      data: {
        token: 'token456',
        refreshToken: 'refresh456',
        roles: ['User'],
      },
    });

    const result = await refreshToken();

    expect(api.post).toHaveBeenCalledWith('/Auth/refresh', { refreshToken: 'refresh123' });
    expect(localStorage.getItem('token')).toBe('token456');
    expect(localStorage.getItem('refreshToken')).toBe('refresh456');
    expect(localStorage.getItem('roles')).toBe(JSON.stringify(['User']));
    expect(result.token).toBe('token456');
    expect(result.roles).toEqual(['User']);
  });

  test('refreshToken lanza error si no hay refreshToken', async () => {
    await expect(refreshToken()).rejects.toThrow('No refresh token found');
  });

  test('register llama a la API con los datos correctos', async () => {
    (api.post as jest.Mock).mockResolvedValue({});
    await register({ displayName: 'Test', email: 'test@test.com', password: '123456' });
    expect(api.post).toHaveBeenCalledWith('/Auth/register', {
      displayName: 'Test',
      email: 'test@test.com',
      password: '123456',
    });
  });
});