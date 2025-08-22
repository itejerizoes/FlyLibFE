import React from 'react';
import {
  createProvince,
  updateProvince,
  deleteProvince,
  getProvinceById,
  getProvinceByName
} from '../../api/provinces';
import { ProvinceCreate, ProvinceUpdate, Province } from '../../types/province';
import FormInput from '../../components/formInput';
import Modal from '../../components/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';

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
    <div>
      <h2>Gestión de Provincias</h2>

      <form onSubmit={handleCreate}>
        <h3>Crear provincia</h3>
        <FormInput
          label="Nombre"
          name="name"
          value={createData.name}
          onChange={handleCreateChange}
          required
        />
        <FormInput
          label="CountryId"
          type="number"
          name="countryId"
          value={createData.countryId}
          onChange={handleCreateChange}
          required
        />
        <button type="submit">Crear</button>
      </form>

      <form onSubmit={handleUpdate}>
        <h3>Actualizar provincia</h3>
        <FormInput
          label="ID"
          type="number"
          name="provinceId"
          value={updateData.provinceId}
          onChange={handleUpdateChange}
          required
        />
        <FormInput
          label="Nombre"
          name="name"
          value={updateData.name}
          onChange={handleUpdateChange}
          required
        />
        <FormInput
          label="CountryId"
          type="number"
          name="countryId"
          value={updateData.countryId}
          onChange={handleUpdateChange}
          required
        />
        <button type="submit">Actualizar</button>
        <button type="button" onClick={handleDelete} style={{ marginLeft: '10px' }}>Eliminar</button>
      </form>

      <div>
        <h3>Buscar provincia por ID</h3>
        <FormInput
          label="ID"
          type="number"
          name="id"
          value={searchForm.id}
          onChange={handleSearchChange}
        />
        <button type="button" onClick={handleSearchById}>Buscar</button>
      </div>

      <div>
        <h3>Buscar provincia por nombre</h3>
        <FormInput
          label="Nombre"
          name="name"
          value={searchForm.name}
          onChange={handleSearchChange}
        />
        <button type="button" onClick={handleSearchByName}>Buscar</button>
      </div>

      {provinceResult && (
        <div>
          <h4>Resultado:</h4>
          <p>ID: {provinceResult.provinceId}</p>
          <p>Nombre: {provinceResult.name}</p>
          <p>CountryId: {provinceResult.countryId}</p>
          <p>Visiteds: {provinceResult.visiteds?.length ?? 0}</p>
        </div>
      )}

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