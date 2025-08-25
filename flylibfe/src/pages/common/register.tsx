import React from 'react';
import { useNavigate } from 'react-router-dom';
import { register as apiRegister } from '../../api/auth';
import { useForm } from '../../hooks/useForm';
import RegisterForm from '../../components/common/registerForm';
import Typography from '@mui/material/Typography';
import '../../styles/common/register.css';

const Register: React.FC = () => {
  const { values, handleChange, reset } = useForm({ email: '', displayName: '', password: '' });
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiRegister(values);
      reset();
      navigate('/login');
    } catch {
      setError('Error al registrar usuario');
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
        values={values}
        handleChange={handleChange}
        loading={loading}
        error={error}
        handleSubmit={handleSubmit}
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