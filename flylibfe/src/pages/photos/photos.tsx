import React from 'react';
import { getPhotos } from '../../api/photos';
import { Photo } from '../../types/photo';
import PhotosList from '../../components/photos/photosList';
import Typography from '@mui/material/Typography';
import { useFetch } from '../../hooks/useFetch';
import '../../styles/photos/photos.css';

const Photos: React.FC = () => {
  const { data: photos, loading, error } = useFetch<Photo[]>(getPhotos);

  return (
    <div className="photos-container">
      <Typography variant="h5" align="center" gutterBottom>
        Listado de Fotos
      </Typography>
      {loading && <Typography>Cargando fotos...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {photos && <PhotosList photos={photos} />}
    </div>
  );
};

export default Photos;