import React from 'react';
import { getUsers } from '../../api/users';
import { User } from '../../types/user';
import UsersList from '../../components/users/usersList';
import Typography from '@mui/material/Typography';
import { useFetch } from '../../hooks/useFetch';
import '../../styles/users/users.css';

const Users: React.FC = () => {
  const { data: users, loading, error } = useFetch<User[]>(getUsers);

  return (
    <div className="users-container">
      <Typography variant="h5" align="center" gutterBottom>
        Listado de Usuarios
      </Typography>
      {loading && <Typography>Cargando usuarios...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {users && <UsersList users={users} />}
    </div>
  );
};

export default Users;