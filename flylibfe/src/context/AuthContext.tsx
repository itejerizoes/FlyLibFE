import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  displayName: string | null;
  roles: string[];
  login: (token: string, refreshToken: string, displayName?: string, roles?: string[]) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [displayName, setDisplayName] = useState<string | null>(localStorage.getItem('displayName'));
  const [roles, setRoles] = useState<string[]>(() => {
    const stored = localStorage.getItem('roles');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
      setDisplayName(localStorage.getItem('displayName'));
      setRoles(JSON.parse(localStorage.getItem('roles') || '[]'));
    };
    window.addEventListener('storage', syncAuth);
    return () => window.removeEventListener('storage', syncAuth);
  }, []);

  const login = (token: string, refreshToken: string, displayName?: string, roles?: string[]) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    if (displayName) localStorage.setItem('displayName', displayName);
    if (roles) localStorage.setItem('roles', JSON.stringify(roles));
    setIsAuthenticated(true);
    setDisplayName(displayName || null);
    setRoles(roles || []);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('displayName');
    localStorage.removeItem('roles');
    setIsAuthenticated(false);
    setDisplayName(null);
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, displayName, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};