import { renderHook, act } from '@testing-library/react';
import { useLogin } from '../../hooks/useLogin';
import * as authApi from '../../api/auth';

jest.mock('../../api/auth');

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('loginUser resuelve correctamente y actualiza loading', async () => {
    (authApi.login as jest.Mock).mockResolvedValue({ token: 'abc' });
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      const res = await result.current.loginUser('test@test.com', '123456');
      expect(res).toEqual({ token: 'abc' });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(authApi.login).toHaveBeenCalledWith({ email: 'test@test.com', password: '123456' });
  });

  test('loginUser maneja error y actualiza error y loading', async () => {
    (authApi.login as jest.Mock).mockRejectedValue(new Error('fail'));
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      const res = await result.current.loginUser('fail@test.com', 'wrong');
      expect(res).toBeNull();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Credenciales incorrectas');
    expect(authApi.login).toHaveBeenCalledWith({ email: 'fail@test.com', password: 'wrong' });
  });
});