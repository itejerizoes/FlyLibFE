import React, { useEffect } from 'react';
import {
  getVisiteds,
  getVisitedById,
  createVisited,
  updateVisited,
  deleteVisited
} from '../../api/visiteds';
import { Visited, VisitedCreate, VisitedUpdate } from '../../types/visited';
import FormInput from '../../components/formInput';
import List from '../../components/list';
import Modal from '../../components/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';

const VisitedManager: React.FC = () => {
  const { values: createData, handleChange: handleCreateChange, reset: resetCreate } = useForm<VisitedCreate>({ userId: '', provinceId: 0, photos: [] });
  const { values: updateData, handleChange: handleUpdateChange, reset: resetUpdate } = useForm<VisitedUpdate>({ id: 0, userId: '', provinceId: 0, photos: [] });
  const { values: searchForm, handleChange: handleSearchChange } = useForm<{ id: string }>({ id: '' });
  const [visiteds, setVisiteds] = React.useState<Visited[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [visitedResult, setVisitedResult] = React.useState<Visited | null>(null);

  // Modal hook
  const { open, title, content, showModal, closeModal } = useModal();

  useEffect(() => {
    getVisiteds()
      .then(data => setVisiteds(data))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const visited = await createVisited(createData);
      setVisiteds([...visiteds, visited]);
      showModal('Éxito', `Registro creado: ${visited.id}`);
      resetCreate();
    } catch {
      showModal('Error', 'Error al crear registro');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateVisited(updateData.id, updateData);
      setVisiteds(visiteds.map(v => v.id === updateData.id ? { ...v, ...updateData } : v));
      showModal('Éxito', 'Registro actualizado');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al actualizar registro');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteVisited(updateData.id);
      setVisiteds(visiteds.filter(v => v.id !== updateData.id));
      showModal('Éxito', 'Registro eliminado');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al eliminar registro');
    }
  };

  const handleSearchById = async () => {
    try {
      const visited = await getVisitedById(Number(searchForm.id));
      setVisitedResult(visited);
      closeModal();
    } catch {
      setVisitedResult(null);
      showModal('Error', 'Registro no encontrado');
    }
  };

  return (
    <div>
      <h2>Gestión de Provincias Visitadas</h2>

      <h3>Listado de registros</h3>
      {loading ? (
        <div>Cargando registros...</div>
      ) : (
        <List
          items={visiteds}
          renderItem={v => (
            <li key={v.id}>
              Usuario: {v.userId} | Provincia: {v.provinceId} | Fotos: {v.photos?.length ?? 0}
            </li>
          )}
        />
      )}

      <form onSubmit={handleCreate}>
        <h3>Crear registro</h3>
        <FormInput
          label="UserId"
          name="userId"
          value={createData.userId}
          onChange={handleCreateChange}
          required
        />
        <FormInput
          label="ProvinceId"
          type="number"
          name="provinceId"
          value={createData.provinceId}
          onChange={handleCreateChange}
          required
        />
        <button type="submit">Crear</button>
      </form>

      <form onSubmit={handleUpdate}>
        <h3>Actualizar registro</h3>
        <FormInput
          label="ID"
          type="number"
          name="id"
          value={updateData.id}
          onChange={handleUpdateChange}
          required
        />
        <FormInput
          label="UserId"
          name="userId"
          value={updateData.userId}
          onChange={handleUpdateChange}
          required
        />
        <FormInput
          label="ProvinceId"
          type="number"
          name="provinceId"
          value={updateData.provinceId}
          onChange={handleUpdateChange}
          required
        />
        <button type="submit">Actualizar</button>
        <button type="button" onClick={handleDelete} style={{ marginLeft: '10px' }}>Eliminar</button>
      </form>

      <div>
        <h3>Buscar registro por ID</h3>
        <FormInput
          label="ID"
          type="number"
          name="id"
          value={searchForm.id}
          onChange={handleSearchChange}
        />
        <button type="button" onClick={handleSearchById}>Buscar</button>
        {visitedResult && (
          <div>
            <p>ID: {visitedResult.id}</p>
            <p>UserId: {visitedResult.userId}</p>
            <p>ProvinceId: {visitedResult.provinceId}</p>
            <p>Fotos: {visitedResult.photos?.length ?? 0}</p>
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

export default VisitedManager;