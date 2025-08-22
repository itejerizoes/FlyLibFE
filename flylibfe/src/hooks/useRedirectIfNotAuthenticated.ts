import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function useRedirectIfNotAuthenticated(path: string = '/login') {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(path);
    }
  }, [isAuthenticated, navigate, path]);
}