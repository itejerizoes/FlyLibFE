import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface RegisterFormProps {
  values: { email: string; displayName: string; password: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  error: string | null;
  handleSubmit: (e: React.FormEvent) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  values,
  handleChange,
  loading,
  error,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit}>
    <TextField
      label="Correo"
      type="email"
      name="email"
      value={values.email}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      placeholder="Correo electrónico"
    />
    <TextField
      label="Nombre"
      name="displayName"
      value={values.displayName}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      placeholder="Nombre completo"
    />
    <TextField
      label="Contraseña"
      type="password"
      name="password"
      value={values.password}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      placeholder="Contraseña"
    />
    <Box sx={{ mt: 2 }}>
      <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
        Registrarse
      </Button>
    </Box>
    {error && (
      <Typography align="center" color="error" sx={{ mt: 2 }}>
        {error}
      </Typography>
    )}
  </form>
);

export default RegisterForm;