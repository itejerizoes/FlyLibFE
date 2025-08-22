import { useState, useEffect } from 'react';

export function useFetch<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchFn()
      .then(setData)
      .catch(() => setError('Error al cargar datos'))
      .finally(() => setLoading(false));
  }, [fetchFn]);

  return { data, loading, error };
}