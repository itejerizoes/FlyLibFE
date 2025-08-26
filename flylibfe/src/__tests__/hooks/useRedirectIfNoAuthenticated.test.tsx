import { renderHook } from '@testing-library/react';
import { useRedirectIfNotAuthenticated } from '../../hooks/useRedirectIfNotAuthenticated';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

jest.mock('../../context/AuthContext');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('useRedirectIfNotAuthenticated', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  test('no navega si está autenticado', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });
    renderHook(() => useRedirectIfNotAuthenticated('/login'));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('navega si no está autenticado', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });
    renderHook(() => useRedirectIfNotAuthenticated('/login'));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('navega al path personalizado si no está autenticado', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });
    renderHook(() => useRedirectIfNotAuthenticated('/custom'));
    expect(mockNavigate).toHaveBeenCalledWith('/custom');
  });
});