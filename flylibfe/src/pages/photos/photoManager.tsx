import React from 'react';
import {
  createPhoto,
  updatePhoto,
  deletePhoto,
  getPhotoById
} from '../../api/photos';
import { PhotoCreate, PhotoUpdate, Photo } from '../../types/photo';
import PhotoForm from '../../components/photoManager/photoForm';
import PhotoSearch from '../../components/photoManager/photoSearch';
import PhotoResult from '../../components/photoManager/photoResult';
import Modal from '../../components/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';
import Typography from '@mui/material/Typography';
import '../../styles/photos/photoManager.css';

const PhotoManager: React.FC = () => {
  // Form hooks
  const { values: createData, handleChange: handleCreateChange, reset: resetCreate } = useForm<PhotoCreate>({ url: '', description: '', visitedId: 0 });
  const { values: updateData, handleChange: handleUpdateChange, reset: resetUpdate } = useForm<PhotoUpdate>({ photoId: 0, url: '', description: '', visitedId: 0 });
  const { values: searchForm, handleChange: handleSearchChange } = useForm<{ id: string }>({ id: '' });
  const [photoResult, setPhotoResult] = React.useState<Photo | null>(null);

  // Modal hook
  const { open, title, content, showModal, closeModal } = useModal();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const photo = await createPhoto(createData);
      showModal('Éxito', `Foto creada: ${photo.id}`);
      resetCreate();
    } catch {
      showModal('Error', 'Error al crear foto');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePhoto(updateData.photoId, updateData);
      showModal('Éxito', 'Foto actualizada');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al actualizar foto');
    }
  };

  const handleDelete = async () => {
    try {
      await deletePhoto(updateData.photoId);
      showModal('Éxito', 'Foto eliminada');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al eliminar foto');
    }
  };

  const handleSearchById = async () => {
    try {
      const photo = await getPhotoById(Number(searchForm.id));
      setPhotoResult(photo);
      closeModal();
    } catch {
      setPhotoResult(null);
      showModal('Error', 'Foto no encontrada');
    }
  };

  return (
    <div className="photo-manager-container">
      <Typography variant="h5" align="center" gutterBottom>
        Gestión de Fotos
      </Typography>

      <div className="photo-manager-section">
        <Typography variant="h6">Crear foto</Typography>
        <PhotoForm
          values={{
            ...createData,
            description: createData.description ?? ''
          }}
          handleChange={handleCreateChange}
          handleSubmit={handleCreate}
        />
      </div>

      <div className="photo-manager-section">
        <Typography variant="h6">Actualizar/Eliminar foto</Typography>
        <PhotoForm
          values={{
            ...updateData,
            description: updateData.description ?? ''
          }}
          handleChange={handleUpdateChange}
          handleSubmit={handleUpdate}
          handleDelete={handleDelete}
          isUpdate
        />
      </div>

      <div className="photo-manager-section">
        <Typography variant="h6">Buscar foto por ID</Typography>
        <PhotoSearch
          value={searchForm.id}
          handleChange={handleSearchChange}
          handleSearch={handleSearchById}
        />
        <PhotoResult photo={photoResult} />
      </div>

      <Modal
        open={open}
        onClose={closeModal}
        title={title}
      >
        <div>{content}</div>
      </Modal>
    </div>
  );
};

export default PhotoManager;