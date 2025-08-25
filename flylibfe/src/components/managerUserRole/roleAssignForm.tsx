import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';

interface RoleAssignFormProps {
  values: { userEmail: string; role: string };
  roles: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAssign: () => void;
  handleRemove: () => void;
}

const RoleAssignForm: React.FC<RoleAssignFormProps> = ({
  values,
  roles,
  handleChange,
  handleAssign,
  handleRemove,
}) => (
  <Box sx={{ mt: 2 }}>
    <TextField
      label="Email de usuario"
      name="userEmail"
      value={values.userEmail}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
    />
    <TextField
      select
      label="Rol"
      name="role"
      value={values.role}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
    >
      {roles.map(role => (
        <MenuItem key={role} value={role}>
          {role}
        </MenuItem>
      ))}
    </TextField>
    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <Button variant="contained" color="primary" onClick={handleAssign}>
        Asignar rol
      </Button>
      <Button variant="outlined" color="error" onClick={handleRemove}>
        Remover rol
      </Button>
    </Box>
  </Box>
);

export default RoleAssignForm;