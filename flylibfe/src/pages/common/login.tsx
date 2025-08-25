import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { useToggle } from '../../hooks/useToggle';
import { useLogin } from '../../hooks/useLogin';
import { useRedirectIfAuthenticated } from '../../hooks/useRedirectIfAuthenticated';
import LoginForm from '../../components/common/loginForm';
import LoginGoogleButton from '../../components/common/loginGoogleButton';
import Typography from '@mui/material/Typography';
import '../../styles/common/login.css';

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
    <div className="login-container">
      <Typography variant="h5" align="center" gutterBottom>
        Iniciar sesión
      </Typography>
      <LoginForm
        values={values}
        handleChange={handleChange}
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
        loading={loading}
        error={error}
        handleSubmit={handleSubmit}
      />
      <LoginGoogleButton loading={loading} onClick={handleGoogleExternalLogin} />
      <div className="login-link">
        <Typography>
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </Typography>
      </div>
    </div>
  );
};

export default Login;