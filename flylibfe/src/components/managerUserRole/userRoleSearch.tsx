import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserRole } from '../../types/manageUserRole';

interface UserSearchProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  userResult: UserRole | null;
}

const UserSearch: React.FC<UserSearchProps> = ({
  value,
  handleChange,
  handleSearch,
  userResult,
}) => (
  <Box sx={{ mt: 2 }}>
    <TextField
      label="Email"
      name="email"
      value={value}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
    />
    <Button variant="contained" color="primary" onClick={handleSearch} sx={{ mb: 2 }}>
      Buscar
    </Button>
    {userResult && (
      <Box sx={{ mt: 2 }}>
        <Typography>ID: {userResult.id}</Typography>
        <Typography>Email: {userResult.email}</Typography>
        <Typography>Nombre: {userResult.displayName}</Typography>
        <Typography>Roles: {userResult.roles.join(', ')}</Typography>
      </Box>
    )}
  </Box>
);

export default UserSearch;