import React from 'react';
import { useNavigate } from 'react-router-dom';
import { register as apiRegister } from '../../api/auth';
import RegisterForm from '../../components/global/registerForm';
import Typography from '@mui/material/Typography';
import '../../styles/common/register.css';

const Register: React.FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; displayName: string; password: string }) => {
    setError(null);
    setLoading(true);
    try {
      await apiRegister(values);
      navigate('/login');
    } catch {
      setError('Error al registrar usuario');
      throw new Error('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Typography variant="h5" align="center" gutterBottom>
        Registro
      </Typography>
      <RegisterForm
        loading={loading}
        error={error}
        onSubmit={handleSubmit}
      />
      <div className="register-link">
        <Typography>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </Typography>
      </div>
    </div>
  );
};

export default Register;