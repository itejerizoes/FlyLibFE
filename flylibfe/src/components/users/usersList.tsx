import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { User } from '../../types/user';

interface UsersListProps {
  users: User[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => (
  <List>
    {users.map(user => (
      <ListItem key={user.id} sx={{ flexDirection: 'column', mb: 2 }}>
        <Typography variant="h6">
          {user.displayName} <span style={{ color: '#888' }}>({user.authProvider})</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: {user.id}
        </Typography>
      </ListItem>
    ))}
  </List>
);

export default UsersList;