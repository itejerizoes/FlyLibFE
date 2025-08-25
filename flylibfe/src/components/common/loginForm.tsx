import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface LoginFormProps {
  loading: boolean;
  error: string | null;
  onSubmit: (values: { email: string; password: string }) => Promise<void>;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
});

const LoginForm: React.FC<LoginFormProps> = ({
  loading,
  error,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        try {
          await onSubmit(values);
          setStatus({ success: '¡Inicio de sesión exitoso!' });
        } catch (e) {
          setStatus({ error: error || 'Error al iniciar sesión' });
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        status,
      }) => (
        <Form>
          <TextField
            label="Correo"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            fullWidth
            margin="normal"
            placeholder="Correo electrónico"
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            fullWidth
            margin="normal"
            placeholder="Contraseña"
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(v => !v)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading || isSubmitting}
              fullWidth
            >
              Entrar
            </Button>
          </Box>
          {status?.error && (
            <Typography align="center" color="error" sx={{ mt: 2 }}>
              {status.error}
            </Typography>
          )}
          {status?.success && (
            <Typography align="center" color="primary" sx={{ mt: 2 }}>
              {status.success}
            </Typography>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;