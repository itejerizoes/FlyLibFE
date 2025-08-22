import React from 'react';
import { getPhotos } from '../../api/photos';
import { Photo } from '../../types/photo';
import List from '../../components/list';
import { useFetch } from '../../hooks/useFetch';

const Photos: React.FC = () => {
  const { data: photos, loading, error } = useFetch<Photo[]>(getPhotos);

  if (loading) return <div>Cargando fotos...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Listado de Fotos</h2>
      <List
        items={photos || []}
        renderItem={photo => (
          <li key={photo.id}>
            <img src={photo.url} alt={photo.description || 'Foto'} width={120} style={{ marginRight: 8 }} />
            <span>
              {photo.description ? photo.description : 'Sin descripción'} | VisitadoId: {photo.visitedId}
            </span>
          </li>
        )}
      />
    </div>
  );
};

export default Photos;