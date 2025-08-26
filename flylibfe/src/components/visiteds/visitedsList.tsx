import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { Visited } from '../../types/visited';

interface VisitedListProps {
  visiteds: Visited[];
  loading: boolean;
}

const VisitedList: React.FC<VisitedListProps> = ({ visiteds, loading }) => (
  <>
    <Typography variant="h6" gutterBottom>
      Listado de registros
    </Typography>
    {loading ? (
      <Typography>Cargando registros...</Typography>
    ) : (
      <List>
        {visiteds.map(v => (
          <ListItem key={v.id} sx={{ flexDirection: 'column', mb: 2 }}>
            <Typography variant="body1">
              Usuario: {v.userId} | Provincia: {v.provinceId} | Fotos: {v.photos?.length ?? 0}
            </Typography>
          </ListItem>
        ))}
      </List>
    )}
  </>
);

export default VisitedList;