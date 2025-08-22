import React from 'react';
import { getUsers } from '../../api/users';
import { User } from '../../types/user';
import List from '../../components/list';
import { useFetch } from '../../hooks/useFetch';

const Users: React.FC = () => {
  const { data: users, loading, error } = useFetch<User[]>(getUsers);

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Listado de Usuarios</h2>
      <List
        items={users || []}
        renderItem={user => (
          <li key={user.id}>
            <strong>{user.displayName}</strong> ({user.authProvider}) - ID: {user.id}
          </li>
        )}
      />
    </div>
  );
};

export default Users;