import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Visited } from '../../types/visited';

interface VisitedsListProps {
  visiteds: Visited[];
}

const VisitedsList: React.FC<VisitedsListProps> = ({ visiteds }) => (
  <List>
    {visiteds.map(visited => (
      <ListItem key={visited.id} sx={{ flexDirection: 'column', mb: 2 }}>
        <Typography variant="body1">
          Usuario: {visited.userId} | Provincia: {visited.provinceId}
        </Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Fotos: {visited.photos?.length ?? 0}
          </Typography>
        </Box>
      </ListItem>
    ))}
  </List>
);

export default VisitedsList;