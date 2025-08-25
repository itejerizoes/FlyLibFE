import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Photo } from '../../types/photo';

interface PhotoResultProps {
  photo: Photo | null;
}

const PhotoResult: React.FC<PhotoResultProps> = ({ photo }) => {
  if (!photo) return null;
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <img src={photo.url} alt={photo.description || 'Foto'} width={120} />
        <Box>
          <Typography>ID: {photo.id}</Typography>
          <Typography>Descripción: {photo.description}</Typography>
          <Typography>VisitedId: {photo.visitedId}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default PhotoResult;