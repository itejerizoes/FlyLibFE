import React from 'react';
import {
  createCountry,
  updateCountry,
  deleteCountry,
  getCountryById,
  getCountryByName
} from '../../api/countries';
import { Country } from '../../types/country';
import FormInput from '../../components/formInput';
import Modal from '../../components/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';

const CountryManager: React.FC = () => {
  // Form hooks
  const { values: createData, handleChange: handleCreateChange, reset: resetCreate } = useForm({ name: '', isoCode: '' });
  const { values: updateData, handleChange: handleUpdateChange, reset: resetUpdate } = useForm({ countryId: 0, name: '', isoCode: '' });
  const { values: search, handleChange: handleSearchChange } = useForm({ id: '', name: '' });
  const [countryResult, setCountryResult] = React.useState<Country | null>(null);

  // Modal hook
  const { open, title, content, showModal, closeModal } = useModal();

  // Create
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const country = await createCountry(createData);
      showModal('Éxito', `País creado: ${country.name}`);
      resetCreate();
    } catch {
      showModal('Error', 'Error al crear país');
    }
  };

  // Update
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateCountry(updateData.countryId, updateData);
      showModal('Éxito', 'País actualizado');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al actualizar país');
    }
  };

  // Delete
  const handleDelete = async () => {
    try {
      await deleteCountry(updateData.countryId);
      showModal('Éxito', 'País eliminado');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al eliminar país');
    }
  };

  // Buscar por ID
  const handleSearchById = async () => {
    try {
      const country = await getCountryById(Number(search.id));
      setCountryResult(country);
      closeModal();
    } catch {
      setCountryResult(null);
      showModal('Error', 'País no encontrado');
    }
  };

  // Buscar por nombre
  const handleSearchByName = async () => {
    try {
      const country = await getCountryByName(search.name);
      setCountryResult(country);
      closeModal();
    } catch {
      setCountryResult(null);
      showModal('Error', 'País no encontrado');
    }
  };

  return (
    <div>
      <h2>Gestión de Países</h2>

      <form onSubmit={handleCreate}>
        <h3>Crear país</h3>
        <FormInput
          label="Nombre"
          name="name"
          value={createData.name}
          onChange={handleCreateChange}
          required
        />
        <FormInput
          label="ISO Code"
          name="isoCode"
          value={createData.isoCode}
          onChange={handleCreateChange}
          required
        />
        <button type="submit">Crear</button>
      </form>

      <form onSubmit={handleUpdate}>
        <h3>Actualizar país</h3>
        <FormInput
          label="ID"
          type="number"
          name="countryId"
          value={updateData.countryId}
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
          label="ISO Code"
          name="isoCode"
          value={updateData.isoCode}
          onChange={handleUpdateChange}
          required
        />
        <button type="submit">Actualizar</button>
        <button type="button" onClick={handleDelete} style={{ marginLeft: '10px' }}>Eliminar</button>
      </form>

      <div>
        <h3>Buscar país por ID</h3>
        <FormInput
          label="ID"
          type="number"
          name="id"
          value={search.id}
          onChange={handleSearchChange}
        />
        <button type="button" onClick={handleSearchById}>Buscar</button>
      </div>

      <div>
        <h3>Buscar país por nombre</h3>
        <FormInput
          label="Nombre"
          name="name"
          value={search.name}
          onChange={handleSearchChange}
        />
        <button type="button" onClick={handleSearchByName}>Buscar</button>
      </div>

      {countryResult && (
        <div>
          <h4>Resultado:</h4>
          <p>ID: {countryResult.countryId}</p>
          <p>Nombre: {countryResult.name}</p>
          <p>ISO Code: {countryResult.isoCode}</p>
          <p>Provincias: {countryResult.provinces.map(p => p.name).join(', ')}</p>
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

export default CountryManager;