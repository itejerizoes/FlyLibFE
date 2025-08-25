import React from 'react';
import {
  createProvince,
  updateProvince,
  deleteProvince,
  getProvinceById,
  getProvinceByName
} from '../../api/provinces';
import { ProvinceCreate, ProvinceUpdate, Province } from '../../types/province';
import ProvinceForm from '../../components/provinceManager/provinceForm';
import ProvinceSearch from '../../components/provinceManager/provinceSearch';
import ProvinceResult from '../../components/provinceManager/provinceResult';
import Modal from '../../components/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';
import Typography from '@mui/material/Typography';
import '../../styles/provinces/provinceManager.css';

const ProvinceManager: React.FC = () => {
  // Form hooks
  const { values: createData, handleChange: handleCreateChange, reset: resetCreate } = useForm<ProvinceCreate>({ name: '', countryId: 0 });
  const { values: updateData, handleChange: handleUpdateChange, reset: resetUpdate } = useForm<ProvinceUpdate>({ provinceId: 0, name: '', countryId: 0 });
  const { values: searchForm, handleChange: handleSearchChange } = useForm<{ id: string; name: string }>({ id: '', name: '' });
  const [provinceResult, setProvinceResult] = React.useState<Province | null>(null);

  // Modal hook
  const { open, title, content, showModal, closeModal } = useModal();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const province = await createProvince(createData);
      showModal('Éxito', `Provincia creada: ${province.name}`);
      resetCreate();
    } catch {
      showModal('Error', 'Error al crear provincia');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProvince(updateData.provinceId, updateData);
      showModal('Éxito', 'Provincia actualizada');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al actualizar provincia');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProvince(updateData.provinceId);
      showModal('Éxito', 'Provincia eliminada');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al eliminar provincia');
    }
  };

  const handleSearchById = async () => {
    try {
      const province = await getProvinceById(Number(searchForm.id));
      setProvinceResult(province);
      closeModal();
    } catch {
      setProvinceResult(null);
      showModal('Error', 'Provincia no encontrada');
    }
  };

  const handleSearchByName = async () => {
    try {
      const province = await getProvinceByName(searchForm.name);
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
          values={createData}
          handleChange={handleCreateChange}
          handleSubmit={handleCreate}
        />
      </div>

      <div className="province-manager-section">
        <Typography variant="h6">Actualizar/Eliminar provincia</Typography>
        <ProvinceForm
          values={updateData}
          handleChange={handleUpdateChange}
          handleSubmit={handleUpdate}
          handleDelete={handleDelete}
          isUpdate
        />
      </div>

      <div className="province-manager-section">
        <Typography variant="h6">Buscar provincia</Typography>
        <ProvinceSearch
          values={searchForm}
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