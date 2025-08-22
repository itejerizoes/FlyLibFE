import React from 'react';
import {
  createPhoto,
  updatePhoto,
  deletePhoto,
  getPhotoById
} from '../../api/photos';
import { PhotoCreate, PhotoUpdate, Photo } from '../../types/photo';
import FormInput from '../../components/formInput';
import Modal from '../../components/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';

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
    <div>
      <h2>Gestión de Fotos</h2>

      <form onSubmit={handleCreate}>
        <h3>Crear foto</h3>
        <FormInput
          label="URL"
          name="url"
          value={createData.url}
          onChange={handleCreateChange}
          required
        />
        <FormInput
          label="Descripción"
          name="description"
          value={createData.description || ''}
          onChange={handleCreateChange}
        />
        <FormInput
          label="VisitedId"
          type="number"
          name="visitedId"
          value={createData.visitedId}
          onChange={handleCreateChange}
          required
        />
        <button type="submit">Crear</button>
      </form>

      <form onSubmit={handleUpdate}>
        <h3>Actualizar foto</h3>
        <FormInput
          label="ID"
          type="number"
          name="photoId"
          value={updateData.photoId}
          onChange={handleUpdateChange}
          required
        />
        <FormInput
          label="URL"
          name="url"
          value={updateData.url}
          onChange={handleUpdateChange}
          required
        />
        <FormInput
          label="Descripción"
          name="description"
          value={updateData.description || ''}
          onChange={handleUpdateChange}
        />
        <FormInput
          label="VisitedId"
          type="number"
          name="visitedId"
          value={updateData.visitedId}
          onChange={handleUpdateChange}
          required
        />
        <button type="submit">Actualizar</button>
        <button type="button" onClick={handleDelete} style={{ marginLeft: '10px' }}>Eliminar</button>
      </form>

      <div>
        <h3>Buscar foto por ID</h3>
        <FormInput
          label="ID"
          type="number"
          name="id"
          value={searchForm.id}
          onChange={handleSearchChange}
        />
        <button type="button" onClick={handleSearchById}>Buscar</button>
        {photoResult && (
          <div>
            <img src={photoResult.url} alt={photoResult.description || 'Foto'} width={120} />
            <p>ID: {photoResult.id}</p>
            <p>Descripción: {photoResult.description}</p>
            <p>VisitedId: {photoResult.visitedId}</p>
          </div>
        )}
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