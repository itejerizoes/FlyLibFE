import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Photo } from '../../types/photo';

interface PhotosListProps {
  photos: Photo[];
}

const PhotosList: React.FC<PhotosListProps> = ({ photos }) => (
  <List>
    {photos.map(photo => (
      <ListItem key={photo.id} sx={{ flexDirection: 'row', mb: 2 }}>
        <Box sx={{ mr: 2 }}>
          <img src={photo.url} alt={photo.description || 'Foto'} width={120} />
        </Box>
        <Box>
          <Typography variant="body1">
            {photo.description ? photo.description : 'Sin descripción'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            VisitadoId: {photo.visitedId}
          </Typography>
        </Box>
      </ListItem>
    ))}
  </List>
);

export default PhotosList;