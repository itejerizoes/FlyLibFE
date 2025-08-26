import { renderHook, act } from '@testing-library/react';
import { useModal } from '../../hooks/useModal';

describe('useModal', () => {
  test('inicializa con valores por defecto', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.open).toBe(false);
    expect(result.current.title).toBe('');
    expect(result.current.content).toBeNull();
  });

  test('showModal actualiza open, title y content', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.showModal('Título', <div>Contenido</div>);
    });
    expect(result.current.open).toBe(true);
    expect(result.current.title).toBe('Título');
    expect(result.current.content).toEqual(<div>Contenido</div>);
  });

  test('closeModal cierra el modal', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.showModal('Título', <div>Contenido</div>);
      result.current.closeModal();
    });
    expect(result.current.open).toBe(false);
  });
});