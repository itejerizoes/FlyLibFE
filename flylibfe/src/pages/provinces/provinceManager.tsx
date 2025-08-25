import React from 'react';
import {
  createProvince,
  updateProvince,
  deleteProvince,
  getProvinceById,
  getProvinceByName
} from '../../api/provinces';
import { Province } from '../../types/province';
import ProvinceForm from '../../components/provinceManager/provinceForm';
import ProvinceSearch from '../../components/provinceManager/provinceSearch';
import ProvinceResult from '../../components/provinceManager/provinceResult';
import Modal from '../../components/common/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';
import Typography from '@mui/material/Typography';
import '../../styles/provinces/provinceManager.css';

const ProvinceManager: React.FC = () => {
  // Estados para formularios
  const [createLoading, setCreateLoading] = React.useState(false);
  const [updateLoading, setUpdateLoading] = React.useState(false);

  const { values: createData, reset: resetCreate } = useForm({ name: '', countryId: 0 });
  const { values: updateData, reset: resetUpdate } = useForm({ provinceId: 0, name: '', countryId: 0 });
  const { values: search, handleChange: handleSearchChange } = useForm({ id: '', name: '' });
  const [provinceResult, setProvinceResult] = React.useState<Province | null>(null);

  // Modal hook
  const { open, title, content, showModal, closeModal } = useModal();

  // Crear provincia
  const handleCreate = async (values: { name: string; countryId: number }) => {
    setCreateLoading(true);
    try {
      const province = await createProvince(values);
      showModal('Éxito', `Provincia creada: ${province.name}`);
      resetCreate();
    } catch {
      showModal('Error', 'Error al crear provincia');
      throw new Error('Error al crear provincia');
    } finally {
      setCreateLoading(false);
    }
  };

  // Actualizar provincia
  const handleUpdate = async (values: { provinceId?: number; name: string; countryId: number }) => {
    setUpdateLoading(true);
    try {
      if (typeof values.provinceId === 'number') {
        await updateProvince(values.provinceId, { ...values, provinceId: values.provinceId });
        showModal('Éxito', 'Provincia actualizada');
        resetUpdate();
      } else {
        showModal('Error', 'El ID de la provincia es obligatorio');
        throw new Error('El ID de la provincia es obligatorio');
      }
    } catch {
      showModal('Error', 'Error al actualizar provincia');
      throw new Error('Error al actualizar provincia');
    } finally {
      setUpdateLoading(false);
    }
  };

  // Eliminar provincia
  const handleDelete = async () => {
    setUpdateLoading(true);
    try {
      await deleteProvince(updateData.provinceId);
      showModal('Éxito', 'Provincia eliminada');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al eliminar provincia');
    } finally {
      setUpdateLoading(false);
    }
  };

  // Buscar por ID
  const handleSearchById = async () => {
    try {
      const province = await getProvinceById(Number(search.id));
      setProvinceResult(province);
      closeModal();
    } catch {
      setProvinceResult(null);
      showModal('Error', 'Provincia no encontrada');
    }
  };

  // Buscar por nombre
  const handleSearchByName = async () => {
    try {
      const province = await getProvinceByName(search.name);
      setProvinceResult(province);
      closeModal();
    } catch {
      setProvinceResult(null);
      showModal('Error', 'Provincia no encontrada');
    }
  };

  return (
    <div className="province-manager-container">
      <Typography variant="h5" align="center" gutterBottom>
        Gestión de Provincias
      </Typography>

      <div className="province-manager-section">
        <Typography variant="h6">Crear provincia</Typography>
        <ProvinceForm
          initialValues={createData}
          loading={createLoading}
          onSubmit={handleCreate}
        />
      </div>

      <div className="province-manager-section">
        <Typography variant="h6">Actualizar/Eliminar provincia</Typography>
        <ProvinceForm
          initialValues={updateData}
          loading={updateLoading}
          onSubmit={handleUpdate}
          onDelete={handleDelete}
          isUpdate
        />
      </div>

      <div className="province-manager-section">
        <Typography variant="h6">Buscar provincia</Typography>
        <ProvinceSearch
          values={search}
          handleChange={handleSearchChange}
          handleSearchById={handleSearchById}
          handleSearchByName={handleSearchByName}
        />
        <ProvinceResult province={provinceResult} />
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

export default ProvinceManager;