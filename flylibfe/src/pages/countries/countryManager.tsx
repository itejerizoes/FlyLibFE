import React from 'react';
import {
  createCountry,
  updateCountry,
  deleteCountry,
  getCountryById,
  getCountryByName
} from '../../api/countries';
import { Country } from '../../types/country';
import CountryForm from '../../components/countryManager/countryForm';
import CountrySearch from '../../components/countryManager/countrySearch';
import CountryResult from '../../components/countryManager/countryResult';
import Modal from '../../components/common/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';
import Typography from '@mui/material/Typography';
import '../../styles/countries/countryManager.css';

const CountryManager: React.FC = () => {
  // Estados para formularios
  const [createLoading, setCreateLoading] = React.useState(false);
  const [updateLoading, setUpdateLoading] = React.useState(false);

  const { values: createData, reset: resetCreate } = useForm({ name: '', isoCode: '' });
  const { values: updateData, reset: resetUpdate } = useForm({ countryId: 0, name: '', isoCode: '' });
  const { values: search, handleChange: handleSearchChange } = useForm({ id: '', name: '' });
  const [countryResult, setCountryResult] = React.useState<Country | null>(null);

  // Modal hook
  const { open, title, content, showModal, closeModal } = useModal();

  // Create
  const handleCreate = async (values: { name: string; isoCode: string }) => {
    setCreateLoading(true);
    try {
      const country = await createCountry(values);
      showModal('Éxito', `País creado: ${country.name}`);
      resetCreate();
    } catch {
      showModal('Error', 'Error al crear país');
      throw new Error('Error al crear país');
    } finally {
      setCreateLoading(false);
    }
  };

  // Update
  const handleUpdate = async (values: { countryId?: number; name: string; isoCode: string }) => {
    setUpdateLoading(true);
    try {
      if (typeof values.countryId === 'number') {
        await updateCountry(values.countryId, { ...values, countryId: values.countryId });
        showModal('Éxito', 'País actualizado');
        resetUpdate();
      } else {
        showModal('Error', 'El ID del país es obligatorio');
        throw new Error('El ID del país es obligatorio');
      }
    } catch {
      showModal('Error', 'Error al actualizar país');
      throw new Error('Error al actualizar país');
    } finally {
      setUpdateLoading(false);
    }
  };

  // Delete
  const handleDelete = async () => {
    setUpdateLoading(true);
    try {
      await deleteCountry(updateData.countryId);
      showModal('Éxito', 'País eliminado');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al eliminar país');
    } finally {
      setUpdateLoading(false);
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
    <div className="country-manager-container">
      <Typography variant="h5" align="center" gutterBottom>
        Gestión de Países
      </Typography>

      <div className="country-manager-section">
        <Typography variant="h6">Crear país</Typography>
        <CountryForm
          initialValues={createData}
          loading={createLoading}
          onSubmit={handleCreate}
        />
      </div>

      <div className="country-manager-section">
        <Typography variant="h6">Actualizar/Eliminar país</Typography>
        <CountryForm
          initialValues={updateData}
          loading={updateLoading}
          onSubmit={handleUpdate}
          onDelete={handleDelete}
          isUpdate
        />
      </div>

      <div className="country-manager-section">
        <Typography variant="h6">Buscar país</Typography>
        <CountrySearch
          values={search}
          handleChange={handleSearchChange}
          handleSearchById={handleSearchById}
          handleSearchByName={handleSearchByName}
        />
        <CountryResult country={countryResult} />
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

export default CountryManager;