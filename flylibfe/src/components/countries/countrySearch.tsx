import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface CountrySearchProps {
  values: { id: string; name: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchById: () => void;
  handleSearchByName: () => void;
}

const CountrySearch: React.FC<CountrySearchProps> = ({
  values,
  handleChange,
  handleSearchById,
  handleSearchByName,
}) => (
  <Box sx={{ mt: 3 }}>
    <TextField
      label="ID"
      type="number"
      name="id"
      value={values.id}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    <Button variant="contained" color="primary" onClick={handleSearchById} sx={{ mb: 2 }}>
      Buscar por ID
    </Button>
    <TextField
      label="Nombre"
      name="name"
      value={values.name}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    <Button variant="contained" color="primary" onClick={handleSearchByName}>
      Buscar por nombre
    </Button>
  </Box>
);

export default CountrySearch;