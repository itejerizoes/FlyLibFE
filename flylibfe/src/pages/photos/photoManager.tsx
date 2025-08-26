import React from 'react';
import {
  createPhoto,
  updatePhoto,
  deletePhoto,
  getPhotoById
} from '../../api/photos';
import { PhotoCreate, PhotoUpdate, Photo } from '../../types/photo';
import PhotoForm from '../../components/photos/photoForm';
import PhotoSearch from '../../components/photos/photoSearch';
import PhotoResult from '../../components/photos/photoResult';
import Modal from '../../components/global/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';
import Typography from '@mui/material/Typography';
import '../../styles/photos/photoManager.css';

const PhotoManager: React.FC = () => {
  // Form hooks
  const { values: createData, reset: resetCreate } = useForm<PhotoCreate>({ url: '', description: '', visitedId: 0 });
  const { values: updateData, reset: resetUpdate } = useForm<PhotoUpdate>({ photoId: 0, url: '', description: '', visitedId: 0 });
  const { values: searchForm, handleChange: handleSearchChange } = useForm<{ id: string }>({ id: '' });
  const [photoResult, setPhotoResult] = React.useState<Photo | null>(null);
  const [createLoading, setCreateLoading] = React.useState(false);
  const [updateLoading, setUpdateLoading] = React.useState(false);

  // Modal hook
  const { open, title, content, showModal, closeModal } = useModal();

  const handleCreate = async (values: PhotoCreate) => {
    setCreateLoading(true);
    try {
      const photo = await createPhoto(values);
      showModal('Éxito', `Foto creada: ${photo.id}`);
      resetCreate();
    } catch {
      showModal('Error', 'Error al crear foto');
      throw new Error('Error al crear foto');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdate = async (values: { photoId?: number; url: string; description: string; visitedId: number }) => {
    setUpdateLoading(true);
    try {
      if (typeof values.photoId === 'number') {
        await updatePhoto(values.photoId, { ...values, photoId: values.photoId });
        showModal('Éxito', 'Foto actualizada');
        resetUpdate();
      } else {
        showModal('Error', 'El ID de la foto es obligatorio');
        throw new Error('El ID de la foto es obligatorio');
      }
    } catch {
      showModal('Error', 'Error al actualizar foto');
      throw new Error('Error al actualizar foto');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    setUpdateLoading(true);
    try {
      await deletePhoto(updateData.photoId);
      showModal('Éxito', 'Foto eliminada');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al eliminar foto');
    } finally {
      setUpdateLoading(false);
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
          initialValues={{
            ...createData,
            description: createData.description ?? ''
          }}
          loading={createLoading}
          onSubmit={handleCreate}
        />
      </div>

      <div className="photo-manager-section">
        <Typography variant="h6">Actualizar/Eliminar foto</Typography>
        <PhotoForm
          initialValues={{
            ...updateData,
            description: updateData.description ?? ''
          }}
          loading={updateLoading}
          onSubmit={handleUpdate}
          onDelete={handleDelete}
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