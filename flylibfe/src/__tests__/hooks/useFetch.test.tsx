import { renderHook, act } from '@testing-library/react';
import { useFetch } from '../../hooks/useFetch';

describe('useFetch', () => {
  test('devuelve datos correctamente cuando la promesa se resuelve', async () => {
    const fetchFn = jest.fn().mockResolvedValue('resultado');
    const { result } = renderHook(() => useFetch(fetchFn));

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.data).toBe('resultado');
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(fetchFn).toHaveBeenCalled();
  });

  test('devuelve error cuando la promesa falla', async () => {
    const fetchFn = jest.fn().mockRejectedValue(new Error('fail'));
    const { result } = renderHook(() => useFetch(fetchFn));

    expect(result.current.loading).toBe(true);

    await act(async () => {});

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Error al cargar datos');
    expect(fetchFn).toHaveBeenCalled();
  });

  test('actualiza loading correctamente', async () => {
    const fetchFn = jest.fn().mockResolvedValue('ok');
    const { result } = renderHook(() => useFetch(fetchFn));
    expect(result.current.loading).toBe(true);
    await act(async () => {});
    expect(result.current.loading).toBe(false);
  });
});