import React from 'react';
import { useNavigate } from 'react-router-dom';
import { register as apiRegister } from '../../api/auth';
import FormInput from '../../components/formInput';
import { useForm } from '../../hooks/useForm';

const Register: React.FC = () => {
  const { values, handleChange, reset } = useForm({ email: '', displayName: '', password: '' });
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await apiRegister(values);
      reset();
      navigate('/login');
    } catch {
      setError('Error al registrar usuario');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Correo"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
          placeholder="Correo electrónico"
        />
        <FormInput
          label="Nombre"
          name="displayName"
          value={values.displayName}
          onChange={handleChange}
          required
          placeholder="Nombre completo"
        />
        <FormInput
          label="Contraseña"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
          placeholder="Contraseña"
        />
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;