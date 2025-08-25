import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface RoleManageFormProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCreate: () => void;
  handleDelete: () => void;
}

const RoleManageForm: React.FC<RoleManageFormProps> = ({
  value,
  handleChange,
  handleCreate,
  handleDelete,
}) => (
  <Box sx={{ mt: 2 }}>
    <TextField
      label="Nombre del rol"
      name="roleName"
      value={value}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
    />
    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <Button variant="contained" color="primary" onClick={handleCreate}>
        Crear rol
      </Button>
      <Button variant="outlined" color="error" onClick={handleDelete}>
        Eliminar rol
      </Button>
    </Box>
  </Box>
);

export default RoleManageForm;