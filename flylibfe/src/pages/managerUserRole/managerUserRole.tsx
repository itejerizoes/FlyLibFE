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
import UserList from '../../components/managerUserRole/userRoleList';
import UserSearch from '../../components/managerUserRole/userRoleSearch';
import RoleAssignForm from '../../components/managerUserRole/roleAssignForm';
import RoleManageForm from '../../components/managerUserRole/roleManageForm';
import Modal from '../../components/global/modal';
import { useForm } from '../../hooks/useForm';
import { useModal } from '../../hooks/useModal';
import Typography from '@mui/material/Typography';
import '../../styles/managerUserRole/managerUserRole.css';

const ManagerUserRole: React.FC = () => {
  const [users, setUsers] = useState<UserRole[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [userResult, setUserResult] = useState<UserRole | null>(null);

  // Form hooks
  const { values: searchForm, handleChange: handleSearchChange } = useForm({ email: '' });
  const { values: assignForm, reset: resetAssign } = useForm({ userEmail: '', role: '' });
  const { values: roleForm, reset: resetRole } = useForm({ roleName: '' });

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
    <div className="manager-user-role-container">
      <Typography variant="h5" align="center" gutterBottom>
        Gestión de Usuarios y Roles
      </Typography>

      <div className="manager-user-role-section">
        <Typography variant="h6">Usuarios</Typography>
        <UserList users={users} />
      </div>

      <div className="manager-user-role-section">
        <Typography variant="h6">Buscar usuario por Email</Typography>
        <UserSearch
          value={searchForm.email}
          handleChange={handleSearchChange}
          handleSearch={handleSearchByEmail}
          userResult={userResult}
        />
      </div>

      <div className="manager-user-role-section">
        <Typography variant="h6">Asignar/Remover rol a usuario</Typography>
        <RoleAssignForm
          roles={roles}
          onSubmit={handleAssignRole}
          onRemove={handleRemoveRole}
        />
      </div>

      <div className="manager-user-role-section">
        <Typography variant="h6">Crear/Eliminar rol</Typography>
        <RoleManageForm
          onCreate={handleCreateRole}
          onDelete={handleDeleteRole}
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

export default ManagerUserRole;