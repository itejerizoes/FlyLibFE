import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Province } from '../../types/province';

interface ProvincesListProps {
  provinces: Province[];
}

const ProvincesList: React.FC<ProvincesListProps> = ({ provinces }) => (
  <List>
    {provinces.map(province => (
      <ListItem key={province.provinceId} sx={{ flexDirection: 'column', mb: 2 }}>
        <Typography variant="h6">
          {province.name} <span style={{ color: '#888' }}>(ID País: {province.countryId})</span>
        </Typography>
        {province.visiteds && province.visiteds.length > 0 && (
          <Box sx={{ pl: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Visitados: {province.visiteds.length}
            </Typography>
          </Box>
        )}
      </ListItem>
    ))}
  </List>
);

export default ProvincesList;