import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { User } from '../../types/user';

interface UserSearchProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  userResult: User | null;
}

const UserSearch: React.FC<UserSearchProps> = ({
  value,
  handleChange,
  handleSearch,
  userResult,
}) => (
  <Box sx={{ mt: 2 }}>
    <TextField
      label="ID"
      name="id"
      value={value}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    <Button variant="contained" color="primary" onClick={handleSearch} sx={{ mb: 2 }}>
      Buscar
    </Button>
    {userResult && (
      <Box sx={{ mt: 2 }}>
        <Typography>ID: {userResult.id}</Typography>
        <Typography>Nombre: {userResult.displayName}</Typography>
        <Typography>AuthProvider: {userResult.authProvider}</Typography>
        <Typography>Visitados: {userResult.visiteds?.length ?? 0}</Typography>
      </Box>
    )}
  </Box>
);

export default UserSearch;