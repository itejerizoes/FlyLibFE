import React, { useEffect } from 'react';
import {
  getVisiteds,
  getVisitedById,
  createVisited,
  updateVisited,
  deleteVisited
} from '../../api/visiteds';
import { Visited, VisitedCreate, VisitedUpdate } from '../../types/visited';
import VisitedList from '../../components/visitedManager/visitedList';
import VisitedForm from '../../components/visitedManager/visitedForm';
import VisitedSearch from '../../components/visitedManager/visitedSearch';
import VisitedResult from '../../components/visitedManager/visitedResult';
import Modal from '../../components/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';
import Typography from '@mui/material/Typography';
import '../../styles/visiteds/visitedManager.css';

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
    <div className="visited-manager-container">
      <Typography variant="h5" align="center" gutterBottom>
        Gestión de Provincias Visitadas
      </Typography>

      <div className="visited-manager-section">
        <VisitedList visiteds={visiteds} loading={loading} />
      </div>

      <div className="visited-manager-section">
        <Typography variant="h6">Crear registro</Typography>
        <VisitedForm
          values={createData}
          handleChange={handleCreateChange}
          handleSubmit={handleCreate}
        />
      </div>

      <div className="visited-manager-section">
        <Typography variant="h6">Actualizar/Eliminar registro</Typography>
        <VisitedForm
          values={updateData}
          handleChange={handleUpdateChange}
          handleSubmit={handleUpdate}
          handleDelete={handleDelete}
          isUpdate
        />
      </div>

      <div className="visited-manager-section">
        <Typography variant="h6">Buscar registro por ID</Typography>
        <VisitedSearch
          value={searchForm.id}
          handleChange={handleSearchChange}
          handleSearch={handleSearchById}
        />
        <VisitedResult visited={visitedResult} />
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