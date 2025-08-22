import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  displayName: string | null;
  login: (token: string, refreshToken: string, displayName?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [displayName, setDisplayName] = useState<string | null>(localStorage.getItem('displayName'));

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
      setDisplayName(localStorage.getItem('displayName'));
    };
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  const login = (token: string, refreshToken: string, displayName?: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    if (displayName) localStorage.setItem('displayName', displayName);
    setIsAuthenticated(true);
    setDisplayName(displayName || null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('displayName');
    setIsAuthenticated(false);
    setDisplayName(null);
  };

  useEffect(() => {
  }, [isAuthenticated, displayName]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, displayName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};