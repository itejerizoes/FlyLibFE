import React from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const menuItems = [
  { label: 'Países', path: '/countries' },
  { label: 'Provincias', path: '/provinces' },
  { label: 'Usuarios', path: '/users' },
  { label: 'Fotos', path: '/photos' },
  { label: 'Visitados', path: '/visiteds' },
];

const DashboardMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <List>
      {menuItems.map(item => (
        <ListItem key={item.path} disablePadding>
          <ListItemButton onClick={() => navigate(item.path)}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default DashboardMenu;