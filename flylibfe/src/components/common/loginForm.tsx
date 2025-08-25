import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface LoginFormProps {
  values: { email: string; password: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  loading: boolean;
  error: string | null;
  handleSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  values,
  handleChange,
  showPassword,
  toggleShowPassword,
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
      label="Contraseña"
      type={showPassword ? 'text' : 'password'}
      name="password"
      value={values.password}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
      placeholder="Contraseña"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    <Box sx={{ mt: 2 }}>
      <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
        Entrar
      </Button>
    </Box>
    {error && (
      <Typography align="center" color="error" sx={{ mt: 2 }}>
        {error}
      </Typography>
    )}
  </form>
);

export default LoginForm;