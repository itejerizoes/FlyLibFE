import { useState } from 'react';
import { login as apiLogin } from '../api/auth';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiLogin({ email, password });
      setLoading(false);
      return res;
    } catch {
      setError('Credenciales incorrectas');
      setLoading(false);
      return null;
    }
  };

  return { loginUser, loading, error };
}