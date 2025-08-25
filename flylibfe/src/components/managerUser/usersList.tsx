import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { User } from '../../types/user';

interface UsersListProps {
  users: User[];
  loading: boolean;
}

const UsersList: React.FC<UsersListProps> = ({ users, loading }) => (
  <>
    <Typography variant="h6" gutterBottom>
      Listado de usuarios
    </Typography>
    {loading ? (
      <Typography>Cargando usuarios...</Typography>
    ) : (
      <List>
        {users.map(user => (
          <ListItem key={user.id} sx={{ flexDirection: 'column', mb: 2 }}>
            <Typography variant="subtitle1">
              <strong>{user.displayName}</strong> ({user.authProvider}) - ID: {user.id}
            </Typography>
          </ListItem>
        ))}
      </List>
    )}
  </>
);

export default UsersList;