import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface PhotoFormProps {
  values: { photoId?: number; url: string; description: string; visitedId: number };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete?: () => void;
  isUpdate?: boolean;
}

const PhotoForm: React.FC<PhotoFormProps> = ({
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
        name="photoId"
        value={values.photoId ?? ''}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
    )}
    <TextField
      label="URL"
      name="url"
      value={values.url}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
    />
    <TextField
      label="Descripción"
      name="description"
      value={values.description}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />
    <TextField
      label="VisitedId"
      type="number"
      name="visitedId"
      value={values.visitedId}
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

export default PhotoForm;