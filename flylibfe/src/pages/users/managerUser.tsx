import React, { useEffect } from 'react';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../../api/users';
import { User, UserCreate, UserUpdate } from '../../types/user';
import FormInput from '../../components/formInput';
import List from '../../components/list';
import Modal from '../../components/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';

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
    <div>
      <h2>Gestión de Usuarios</h2>

      <h3>Listado de usuarios</h3>
      {loading ? (
        <div>Cargando usuarios...</div>
      ) : (
        <List
          items={users}
          renderItem={user => (
            <li key={user.id}>
              <strong>{user.displayName}</strong> ({user.authProvider}) - ID: {user.id}
            </li>
          )}
        />
      )}

      <form onSubmit={handleCreate}>
        <h3>Crear usuario</h3>
        <FormInput
          label="Display Name"
          name="displayName"
          value={createData.displayName}
          onChange={handleCreateChange}
          required
        />
        <FormInput
          label="Auth Provider"
          name="authProvider"
          value={createData.authProvider}
          onChange={handleCreateChange}
          required
        />
        <button type="submit">Crear</button>
      </form>

      <form onSubmit={handleUpdate}>
        <h3>Actualizar usuario</h3>
        <FormInput
          label="ID"
          name="id"
          value={updateData.id}
          onChange={handleUpdateChange}
          required
        />
        <FormInput
          label="Display Name"
          name="displayName"
          value={updateData.displayName}
          onChange={handleUpdateChange}
          required
        />
        <FormInput
          label="Auth Provider"
          name="authProvider"
          value={updateData.authProvider}
          onChange={handleUpdateChange}
          required
        />
        <button type="submit">Actualizar</button>
        <button type="button" onClick={handleDelete} style={{ marginLeft: '10px' }}>Eliminar</button>
      </form>

      <div>
        <h3>Buscar usuario por ID</h3>
        <FormInput
          label="ID"
          name="id"
          value={searchForm.id}
          onChange={handleSearchChange}
        />
        <button type="button" onClick={handleSearchById}>Buscar</button>
        {userResult && (
          <div>
            <p>ID: {userResult.id}</p>
            <p>Nombre: {userResult.displayName}</p>
            <p>AuthProvider: {userResult.authProvider}</p>
            <p>Visitados: {userResult.visiteds?.length ?? 0}</p>
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

export default ManagerUser;