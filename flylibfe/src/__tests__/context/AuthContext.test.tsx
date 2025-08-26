import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/AuthContext';

const TestComponent = () => {
  const { isAuthenticated, displayName, roles, login, logout } = useAuth();
  return (
    <div>
      <span>auth:{isAuthenticated ? 'yes' : 'no'}</span>
      <span>name:{displayName}</span>
      <span>roles:{roles.join(',')}</span>
      <button onClick={() => login('token', 'refresh', 'Ignacio', ['Admin'])}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('provee valores iniciales correctos', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getAllByText(/auth:no/i)).toBeInTheDocument();
    expect(screen.getAllByText(/name:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/roles:/i)).toBeInTheDocument();
  });

  test('login actualiza el contexto y localStorage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    act(() => {
      screen.getAllByText('Login').click();
    });
    expect(screen.getAllByText(/auth:yes/i)).toBeInTheDocument();
    expect(screen.getAllByText(/name:Ignacio/i)).toBeInTheDocument();
    expect(screen.getAllByText(/roles:Admin/i)).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBe('token');
    expect(localStorage.getItem('displayName')).toBe('Ignacio');
    expect(localStorage.getItem('roles')).toBe(JSON.stringify(['Admin']));
  });

  test('logout limpia el contexto y localStorage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    act(() => {
      screen.getAllByText('Login').click();
      screen.getAllByText('Logout').click();
    });
    expect(screen.getAllByText(/auth:no/i)).toBeInTheDocument();
    expect(screen.getAllByText(/name:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/roles:/i)).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('displayName')).toBeNull();
    expect(localStorage.getItem('roles')).toBeNull();
  });

  test('useAuth lanza error si no está dentro de AuthProvider', () => {
    const Broken = () => {
      useAuth();
      return null;
    };
    expect(() => render(<Broken />)).toThrow('useAuth must be used within AuthProvider');
  });
});