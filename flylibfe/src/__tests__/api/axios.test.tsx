import api from '../../api/axios';

describe('axios config', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
    // Mock window.location para todos los tests
    (window as any).location = { href: '' };
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
    const error = { response: { status: 401 } };
    // @ts-ignore
    await expect(api.interceptors.response.handlers[0].rejected(error)).rejects.toBe(error);
    expect(clearSpy).toHaveBeenCalled();
    expect(window.location.href).toBe('/login');
  });

  test('no redirige si status no es 401', async () => {
    const clearSpy = jest.spyOn(localStorage, 'clear');
    const error = { response: { status: 500 } };
    // @ts-ignore
    await expect(api.interceptors.response.handlers[0].rejected(error)).rejects.toBe(error);
    expect(clearSpy).not.toHaveBeenCalled();
    expect(window.location.href).not.toBe('/login');
  });

  test('no redirige ni limpia localStorage si error no tiene response', async () => {
    const clearSpy = jest.spyOn(localStorage, 'clear');
    const error = {};
    // @ts-ignore
    await expect(api.interceptors.response.handlers[0].rejected(error)).rejects.toBe(error);
    expect(clearSpy).not.toHaveBeenCalled();
    expect(window.location.href).not.toBe('/login');
  });

  test('no redirige ni limpia localStorage si error.response.status es undefined', async () => {
    const clearSpy = jest.spyOn(localStorage, 'clear');
    const error = { response: {} };
    // @ts-ignore
    await expect(api.interceptors.response.handlers[0].rejected(error)).rejects.toBe(error);
    expect(clearSpy).not.toHaveBeenCalled();
    expect(window.location.href).not.toBe('/login');
  });

  test('no lanza error si localStorage.clear falla', async () => {
    const clearSpy = jest.spyOn(localStorage, 'clear').mockImplementation(() => { throw new Error('fail'); });
    const error = { response: { status: 401 } };
    // @ts-ignore
    await expect(api.interceptors.response.handlers[0].rejected(error)).rejects.toBe(error);
    expect(window.location.href).toBe('/login');
    clearSpy.mockRestore();
  });

  test('redirige correctamente si window.location.href ya es /login', async () => {
    (window as any).location = { href: '/login' };
    const clearSpy = jest.spyOn(localStorage, 'clear');
    const error = { response: { status: 401 } };
    // @ts-ignore
    await expect(api.interceptors.response.handlers[0].rejected(error)).rejects.toBe(error);
    expect(clearSpy).toHaveBeenCalled();
    expect(window.location.href).toBe('/login');
    clearSpy.mockRestore();
  });
});