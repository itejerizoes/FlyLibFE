import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLogin } from '../../hooks/useLogin';
import { useRedirectIfAuthenticated } from '../../hooks/useRedirectIfAuthenticated';
import LoginForm from '../../components/common/loginForm';
import LoginGoogleButton from '../../components/common/loginGoogleButton';
import Typography from '@mui/material/Typography';
import '../../styles/common/login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { loginUser, loading, error } = useLogin();

  useRedirectIfAuthenticated('/dashboard');

  const handleSubmit = async (values: { email: string; password: string }) => {
    const res = await loginUser(values.email, values.password);
    if (res) {
      const roles =
      Array.isArray(res.roles)
        ? res.roles.filter((r): r is string => typeof r === 'string')
        : typeof res.roles === 'string'
        ? [res.roles]
        : [];
      login(res.token, res.refreshToken, res.displayName, roles);
      navigate('/dashboard');
    } else {
      throw new Error('Credenciales inválidas');
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
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
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