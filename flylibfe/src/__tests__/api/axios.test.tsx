import api from '../../api/axios';

describe('axios config', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test('agrega el token al header Authorization si existe', async () => {
    localStorage.setItem('token', 'test-token');
    const config = { headers: {} };
    // @ts-ignore
    const result = await api.interceptors.request.handlers[0].fulfilled(config);
    expect(result.headers.Authorization).toBe('Bearer test-token');
  });

  test('no agrega Authorization si no hay token', async () => {
    const config = { headers: {} };
    // @ts-ignore
    const result = await api.interceptors.request.handlers[0].fulfilled(config);
    expect(result.headers.Authorization).toBeUndefined();
  });

  test('redirige al login y limpia localStorage si status es 401', async () => {
    const clearSpy = jest.spyOn(localStorage, 'clear');
    const hrefSpy = jest.spyOn(window.location, 'href', 'set');
    const error = { response: { status: 401 } };
    // @ts-ignore
    await expect(api.interceptors.response.handlers[0].rejected(error)).rejects.toBe(error);
    expect(clearSpy).toHaveBeenCalled();
    expect(hrefSpy).toHaveBeenCalledWith('/login');
  });

  test('no redirige si status no es 401', async () => {
    const clearSpy = jest.spyOn(localStorage, 'clear');
    const hrefSpy = jest.spyOn(window.location, 'href', 'set');
    const error = { response: { status: 500 } };
    // @ts-ignore
    await expect(api.interceptors.response.handlers[0].rejected(error)).rejects.toBe(error);
    expect(clearSpy).not.toHaveBeenCalled();
    expect(hrefSpy).not.toHaveBeenCalled();
  });
});