import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface ProvinceFormProps {
  values: { provinceId?: number; name: string; countryId: number };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete?: () => void;
  isUpdate?: boolean;
}

const ProvinceForm: React.FC<ProvinceFormProps> = ({
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
        type="number"
        name="provinceId"
        value={values.provinceId ?? ''}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
    )}
    <TextField
      label="Nombre"
      name="name"
      value={values.name}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
    />
    <TextField
      label="CountryId"
      type="number"
      name="countryId"
      value={values.countryId}
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

export default ProvinceForm;