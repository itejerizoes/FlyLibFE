import { useState } from 'react';

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const reset = () => setValues(initialValues);

  return { values, handleChange, reset, setValues };
}