import React, { useEffect } from 'react';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../../api/users';
import { User, UserCreate, UserUpdate } from '../../types/user';
import UsersList from '../../components/managerUser/usersList';
import UserForm from '../../components/managerUser/userForm';
import UserSearch from '../../components/managerUser/userSearch';
import Modal from '../../components/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';
import Typography from '@mui/material/Typography';
import '../../styles/users/managerUser.css';

const ManagerUser: React.FC = () => {
  const { values: createData, handleChange: handleCreateChange, reset: resetCreate } = useForm<UserCreate>({ displayName: '', authProvider: '' });
  const { values: updateData, handleChange: handleUpdateChange, reset: resetUpdate } = useForm<UserUpdate>({ id: '', displayName: '', authProvider: '' });
  const { values: searchForm, handleChange: handleSearchChange } = useForm<{ id: string }>({ id: '' });
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [userResult, setUserResult] = React.useState<User | null>(null);

  // Modal hook
  const { open, title, content, showModal, closeModal } = useModal();

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await createUser(createData);
      setUsers([...users, user]);
      showModal('Éxito', `Usuario creado: ${user.displayName}`);
      resetCreate();
    } catch {
      showModal('Error', 'Error al crear usuario');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(updateData.id, updateData);
      setUsers(users.map(u => u.id === updateData.id ? { ...u, ...updateData } : u));
      showModal('Éxito', 'Usuario actualizado');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al actualizar usuario');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(updateData.id);
      setUsers(users.filter(u => u.id !== updateData.id));
      showModal('Éxito', 'Usuario eliminado');
      resetUpdate();
    } catch {
      showModal('Error', 'Error al eliminar usuario');
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
          values={createData}
          handleChange={handleCreateChange}
          handleSubmit={handleCreate}
        />
      </div>

      <div className="manager-user-section">
        <Typography variant="h6">Actualizar/Eliminar usuario</Typography>
        <UserForm
          values={updateData}
          handleChange={handleUpdateChange}
          handleSubmit={handleUpdate}
          handleDelete={handleDelete}
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