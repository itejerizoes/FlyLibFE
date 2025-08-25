import React from 'react';
import Button from '@mui/material/Button';

interface LoginGoogleButtonProps {
  loading: boolean;
  onClick: () => void;
}

const LoginGoogleButton: React.FC<LoginGoogleButtonProps> = ({ loading, onClick }) => (
  <Button
    variant="outlined"
    color="secondary"
    onClick={onClick}
    disabled={loading}
    fullWidth
    sx={{ mt: 2 }}
  >
    Iniciar sesión con Google
  </Button>
);

export default LoginGoogleButton;