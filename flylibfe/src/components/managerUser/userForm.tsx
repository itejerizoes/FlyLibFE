import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface UserFormProps {
  values: { id?: string; displayName: string; authProvider: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete?: () => void;
  isUpdate?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  values,
  handleChange,
  handleSubmit,
  handleDelete,
  isUpdate = false,
}) => (
  <form onSubmit={handleSubmit}>
    {isUpdate && (
      <TextField
        label="ID"
        name="id"
        value={values.id ?? ''}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
    )}
    <TextField
      label="Display Name"
      name="displayName"
      value={values.displayName}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
    />
    <TextField
      label="Auth Provider"
      name="authProvider"
      value={values.authProvider}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
    />
    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
      <Button type="submit" variant="contained" color="primary">
        {isUpdate ? 'Actualizar' : 'Crear'}
      </Button>
      {isUpdate && handleDelete && (
        <Button type="button" variant="outlined" color="error" onClick={handleDelete}>
          Eliminar
        </Button>
      )}
    </Box>
  </form>
);

export default UserForm;