import React, { useEffect, useState } from 'react';
import {
  getUsers,
  getUserByEmail,
  getRoles,
  assignRole,
  removeRole,
  createRole,
  deleteRole
} from '../../api/manageruserrole';
import { UserRole } from '../../types/manageUserRole';
import FormInput from '../../components/formInput';
import FormSelect from '../../components/formSelect';
import List from '../../components/list';
import Modal from '../../components/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';

const ManagerUserRole: React.FC = () => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [userResult, setUserResult] = useState<UserRole | null>(null);

  // Form hooks
  const { values: searchForm, handleChange: handleSearchChange } = useForm({ email: '' });
  const { values: assignForm, handleChange: handleAssignChange, reset: resetAssign } = useForm({ userEmail: '', role: '' });
  const { values: roleForm, handleChange: handleRoleChange, reset: resetRole } = useForm({ roleName: '' });

  // Modal hook
  const { open, title, content, showModal, closeModal } = useModal();

  useEffect(() => {
    getUsers().then(setUsers);
    getRoles().then(setRoles);
  }, []);

  const handleSearchByEmail = async () => {
    try {
      const user = await getUserByEmail(searchForm.email);
      setUserResult(user);
      closeModal();
    } catch {
      setUserResult(null);
      showModal('Error', 'Usuario no encontrado');
    }
  };

  const handleAssignRole = async () => {
    try {
      const res = await assignRole(assignForm);
      showModal('Éxito', res.message || 'Rol asignado');
      resetAssign();
    } catch {
      showModal('Error', 'Error al asignar rol');
    }
  };

  const handleRemoveRole = async () => {
    try {
      const res = await removeRole(assignForm);
      showModal('Éxito', res.message || 'Rol removido');
      resetAssign();
    } catch {
      showModal('Error', 'Error al remover rol');
    }
  };

  const handleCreateRole = async () => {
    try {
      const res = await createRole({ role: roleForm.roleName });
      showModal('Éxito', res.message || 'Rol creado');
      getRoles().then(setRoles);
      resetRole();
    } catch {
      showModal('Error', 'Error al crear rol');
    }
  };

  const handleDeleteRole = async () => {
    try {
      const res = await deleteRole({ role: roleForm.roleName });
      showModal('Éxito', res.message || 'Rol eliminado');
      getRoles().then(setRoles);
      resetRole();
    } catch {
      showModal('Error', 'Error al eliminar rol');
    }
  };

  return (
    <div>
      <h2>Gestión de Usuarios y Roles</h2>

      <h3>Usuarios</h3>
      <List
        items={users}
        renderItem={user => (
          <li key={user.id}>
            <strong>{user.displayName}</strong> ({user.email}) - Roles: {user.roles.join(', ')}
          </li>
        )}
      />

      <div>
        <h3>Buscar usuario por Email</h3>
        <FormInput
          label="Email"
          name="email"
          value={searchForm.email}
          onChange={handleSearchChange}
          required
        />
        <button type="button" onClick={handleSearchByEmail}>Buscar</button>
        {userResult && (
          <div>
            <p>ID: {userResult.id}</p>
            <p>Email: {userResult.email}</p>
            <p>Nombre: {userResult.displayName}</p>
            <p>Roles: {userResult.roles.join(', ')}</p>
          </div>
        )}
      </div>

      <div>
        <h3>Asignar/Remover rol a usuario</h3>
        <FormInput
          label="Email de usuario"
          name="userEmail"
          value={assignForm.userEmail}
          onChange={handleAssignChange}
          required
        />
        <FormSelect
          label="Rol"
          name="role"
          value={assignForm.role}
          onChange={handleAssignChange}
          options={roles.map(role => ({ value: role, label: role }))}
          required
        />
        <button type="button" onClick={handleAssignRole}>Asignar rol</button>
        <button type="button" onClick={handleRemoveRole}>Remover rol</button>
      </div>

      <div>
        <h3>Crear/Eliminar rol</h3>
        <FormInput
          label="Nombre del rol"
          name="roleName"
          value={roleForm.roleName}
          onChange={handleRoleChange}
          required
        />
        <button type="button" onClick={handleCreateRole}>Crear rol</button>
        <button type="button" onClick={handleDeleteRole}>Eliminar rol</button>
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

export default ManagerUserRole;