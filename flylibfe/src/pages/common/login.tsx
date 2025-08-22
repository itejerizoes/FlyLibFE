import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FormInput from '../../components/formInput';
import { useForm } from '../../hooks/useForm';
import { useToggle } from '../../hooks/useToggle';
import { useLogin } from '../../hooks/useLogin';
import { useRedirectIfAuthenticated } from '../../hooks/useRedirectIfAuthenticated';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { values, handleChange } = useForm({ email: '', password: '' });
  const [showPassword, toggleShowPassword] = useToggle(false);
  const { loginUser, loading, error } = useLogin();

  useRedirectIfAuthenticated('/dashboard');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginUser(values.email, values.password);
    if (res) {
      login(res.token, res.refreshToken, res.displayName);
      navigate('/dashboard');
    }
  };

  const handleGoogleExternalLogin = () => {
    window.location.href = 'https://localhost:7157/api/Auth/external-login?provider=Google&returnUrl=/dashboard';
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
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
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={values.password}
          onChange={handleChange}
          required
          placeholder="Contraseña"
        />
        <button type="button" onClick={toggleShowPassword} style={{ marginBottom: 8 }}>
          {showPassword ? 'Ocultar' : 'Mostrar'} contraseña
        </button>
        <button type="submit" disabled={loading}>Entrar</button>
      </form>
      <p>
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleGoogleExternalLogin} disabled={loading}>
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default Login;