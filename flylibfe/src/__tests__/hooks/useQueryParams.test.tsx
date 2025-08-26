import { renderHook } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter initialEntries={['/test?foo=bar&num=42']}>
    <Routes>
      <Route path="/test" element={children} />
    </Routes>
  </MemoryRouter>
);

describe('useQueryParams', () => {
  test('devuelve los parámetros de la URL correctamente', () => {
    const { result } = renderHook(() => useQueryParams(), { wrapper });
    expect(result.current.get('foo')).toBe('bar');
    expect(result.current.get('num')).toBe('42');
  });

  test('devuelve null si el parámetro no existe', () => {
    const { result } = renderHook(() => useQueryParams(), { wrapper });
    expect(result.current.get('missing')).toBeNull();
  });
});