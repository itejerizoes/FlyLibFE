import { renderHook } from '@testing-library/react';
import { useRedirectIfAuthenticated } from '../../hooks/useRedirectIfAuthenticated';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

jest.mock('../../context/AuthContext');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('useRedirectIfAuthenticated', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  test('no navega si no está autenticado', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });
    renderHook(() => useRedirectIfAuthenticated('/dashboard'));
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('navega si está autenticado', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });
    renderHook(() => useRedirectIfAuthenticated('/dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
});