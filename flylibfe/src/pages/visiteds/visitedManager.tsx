import React, { useEffect } from 'react';
import {
  getVisiteds,
  getVisitedById,
  createVisited,
  updateVisited,
  deleteVisited
} from '../../api/visiteds';
import { Visited } from '../../types/visited';
import VisitedList from '../../components/visitedManager/visitedList';
import VisitedForm from '../../components/visitedManager/visitedForm';
import VisitedSearch from '../../components/visitedManager/visitedSearch';
import VisitedResult from '../../components/visitedManager/visitedResult';
import Modal from '../../components/common/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';
import Typography from '@mui/material/Typography';
import '../../styles/visiteds/visitedManager.css';

const VisitedManager: React.FC = () => {
  const { values: createData, reset: resetCreate } = useForm({ userId: '', provinceId: 0 });
  const { values: updateData, reset: resetUpdate } = useForm({ id: 0, userId: '', provinceId: 0 });
  const { values: searchForm, handleChange: handleSearchChange } = useForm<{ id: string }>({ id: '' });
  const [visiteds, setVisiteds] = React.useState<Visited[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [visitedResult, setVisitedResult] = React.useState<Visited | null>(null);
  const [createLoading, setCreateLoading] = React.useState(false);
  const [updateLoading, setUpdateLoading] = React.useState(false);

  // Modal hook
  const { open, title, content, showModal, closeModal } = useModal();

  useEffect(() => {
    getVisiteds()
      .then(data => setVisiteds(data))
      .finally(() => setLoading(false));
  }, []);

  // Crear registro
  const handleCreate = async (values: { userId: string; provinceId: number }) => {
    setCreateLoading(true);
    try {
      const visited = await createVisited({ ...values, photos: [] });
      setVisiteds([...visiteds, visited]);
      showModal('Éxito', `Registro creado: ${visited.id}`);
      resetCreate();
    } catch {
      showModal('Error', 'Error al crear registro');
      throw new Error('Error al crear registro');
    } finally {
      setCreateLoading(false);
    }
  };

  // Actualizar registro
  const handleUpdate = async (values: { id?: number; userId: string; provinceId: number }) => {
    setUpdateLoading(true);
    try {
      if (typeof values.id === 'number') {
        await updateVisited(values.id, { ...values, id: values.id, photos: [] });
        setVisiteds(visiteds.map(v => v.id === values.id ? { ...v, ...values, photos: [] } : v));
        showModal('Éxito', 'Registro actualizado');
        resetUpdate();
      } else {
        showModal('Error', 'El ID del registro es obligatorio');
        throw new Error('El ID del registro es obligatorio');
      }
    } catch {
      showModal('Error', 'Error al actualizar registro');
      throw new Error('Error al actualizar registro');
    } finally {
      setUpdateLoading(false);
    }
  };

  // Eliminar registro
  const handleDelete = async () => {
    setUpdateLoading(true);
    try {
      await deleteVisited(updateData.id);
      setVisiteds(visiteds.filter(v => v.id !== updateData.id));
      showModal('Éxito', 'Registro eliminado');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al eliminar registro');
    } finally {
      setUpdateLoading(false);
    }
  };

  // Buscar por ID
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
          initialValues={createData}
          loading={createLoading}
          onSubmit={handleCreate}
        />
      </div>

      <div className="visited-manager-section">
        <Typography variant="h6">Actualizar/Eliminar registro</Typography>
        <VisitedForm
          initialValues={updateData}
          loading={updateLoading}
          onSubmit={handleUpdate}
          onDelete={handleDelete}
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