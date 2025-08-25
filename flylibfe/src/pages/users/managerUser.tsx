import React, { useEffect } from 'react';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../../api/users';
import { User } from '../../types/user';
import UsersList from '../../components/managerUser/usersList';
import UserForm from '../../components/managerUser/userForm';
import UserSearch from '../../components/managerUser/userSearch';
import Modal from '../../components/common/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';
import Typography from '@mui/material/Typography';
import '../../styles/users/managerUser.css';

const ManagerUser: React.FC = () => {
  const { values: createData, reset: resetCreate } = useForm({ displayName: '', authProvider: '' });
  const { values: updateData, reset: resetUpdate } = useForm({ id: '', displayName: '', authProvider: '' });
  const { values: searchForm, handleChange: handleSearchChange } = useForm<{ id: string }>({ id: '' });
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [userResult, setUserResult] = React.useState<User | null>(null);
  const [createLoading, setCreateLoading] = React.useState(false);
  const [updateLoading, setUpdateLoading] = React.useState(false);

  // Modal hook
  const { open, title, content, showModal, closeModal } = useModal();

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (values: { displayName: string; authProvider: string }) => {
    setCreateLoading(true);
    try {
      const user = await createUser(values);
      setUsers([...users, user]);
      showModal('Éxito', `Usuario creado: ${user.displayName}`);
      resetCreate();
    } catch {
      showModal('Error', 'Error al crear usuario');
      throw new Error('Error al crear usuario');
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdate = async (values: { id?: string; displayName: string; authProvider: string }) => {
    setUpdateLoading(true);
    try {
      if (typeof values.id === 'string' && values.id) {
        await updateUser(values.id, { ...values, id: values.id });
        setUsers(users.map(u => u.id === values.id ? { ...u, ...values } : u));
        showModal('Éxito', 'Usuario actualizado');
        resetUpdate();
      } else {
        showModal('Error', 'El ID del usuario es obligatorio');
        throw new Error('El ID del usuario es obligatorio');
      }
    } catch {
      showModal('Error', 'Error al actualizar usuario');
      throw new Error('Error al actualizar usuario');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    setUpdateLoading(true);
    try {
      await deleteUser(updateData.id);
      setUsers(users.filter(u => u.id !== updateData.id));
      showModal('Éxito', 'Usuario eliminado');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al eliminar usuario');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleSearchById = async () => {
    try {
      const user = await getUserById(searchForm.id);
      setUserResult(user);
      closeModal();
    } catch {
      setUserResult(null);
      showModal('Error', 'Usuario no encontrado');
    }
  };

  return (
    <div className="manager-user-container">
      <Typography variant="h5" align="center" gutterBottom>
        Gestión de Usuarios
      </Typography>

      <div className="manager-user-section">
        <UsersList users={users} loading={loading} />
      </div>

      <div className="manager-user-section">
        <Typography variant="h6">Crear usuario</Typography>
        <UserForm
          initialValues={createData}
          loading={createLoading}
          onSubmit={handleCreate}
        />
      </div>

      <div className="manager-user-section">
        <Typography variant="h6">Actualizar/Eliminar usuario</Typography>
        <UserForm
          initialValues={updateData}
          loading={updateLoading}
          onSubmit={handleUpdate}
          onDelete={handleDelete}
          isUpdate
        />
      </div>

      <div className="manager-user-section">
        <Typography variant="h6">Buscar usuario por ID</Typography>
        <UserSearch
          value={searchForm.id}
          handleChange={handleSearchChange}
          handleSearch={handleSearchById}
          userResult={userResult}
        />
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

export default ManagerUser;