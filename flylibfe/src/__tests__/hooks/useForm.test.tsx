import { renderHook, act } from '@testing-library/react';
import { useForm } from '../../hooks/useForm';

describe('useForm', () => {
  test('inicializa los valores correctamente', () => {
    const { result } = renderHook(() => useForm({ name: '', age: 0 }));
    expect(result.current.values).toEqual({ name: '', age: 0 });
  });

  test('handleChange actualiza el valor de texto', () => {
    const { result } = renderHook(() => useForm({ name: '', age: 0 }));
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Ignacio', type: 'text' }
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.values.name).toBe('Ignacio');
  });

  test('handleChange actualiza el valor numérico', () => {
    const { result } = renderHook(() => useForm({ name: '', age: 0 }));
    act(() => {
      result.current.handleChange({
        target: { name: 'age', value: '25', type: 'number' }
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.values.age).toBe(25);
  });

  test('reset vuelve a los valores iniciales', () => {
    const { result } = renderHook(() => useForm({ name: 'A', age: 1 }));
    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'B', type: 'text' }
      } as React.ChangeEvent<HTMLInputElement>);
    });
    act(() => {
      result.current.reset();
    });
    expect(result.current.values).toEqual({ name: 'A', age: 1 });
  });

  test('setValues actualiza el estado manualmente', () => {
    const { result } = renderHook(() => useForm({ name: '', age: 0 }));
    act(() => {
      result.current.setValues({ name: 'Maria', age: 30 });
    });
    expect(result.current.values).toEqual({ name: 'Maria', age: 30 });
  });
});