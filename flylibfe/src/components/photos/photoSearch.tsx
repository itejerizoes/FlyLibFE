import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface PhotoSearchProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

const PhotoSearch: React.FC<PhotoSearchProps> = ({
  value,
  handleChange,
  handleSearch,
}) => (
  <Box sx={{ mt: 2 }}>
    <TextField
      label="ID"
      type="number"
      name="id"
      value={value}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    <Button variant="contained" color="primary" onClick={handleSearch} sx={{ mt: 1 }}>
      Buscar
    </Button>
  </Box>
);

export default PhotoSearch;