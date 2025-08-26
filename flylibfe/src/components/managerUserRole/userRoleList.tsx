import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { UserRole } from '../../types/manageUserRole';

interface UserListProps {
  users: UserRole[];
}

const UserList: React.FC<UserListProps> = ({ users }) => (
  <List>
    {users.map(user => (
      <ListItem key={user.id} sx={{ flexDirection: 'column', mb: 2 }}>
        <Typography variant="subtitle1">
          <strong>{user.displayName}</strong> ({user.email})
        </Typography>
        <Typography variant="body2">
          Roles: {user.roles.join(', ') || 'Sin roles'}
        </Typography>
      </ListItem>
    ))}
  </List>
);

export default UserList;