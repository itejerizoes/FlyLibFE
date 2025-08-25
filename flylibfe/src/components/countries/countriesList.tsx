import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import { Country } from '../../types/country';

interface CountriesListProps {
  countries: Country[];
}

const CountriesList: React.FC<CountriesListProps> = ({ countries }) => (
  <List>
    {countries.map(country => (
      <ListItem key={country.countryId} alignItems="flex-start" sx={{ flexDirection: 'column', mb: 2 }}>
        <Typography variant="h6">
          {country.name} <span style={{ color: '#888' }}>({country.isoCode})</span>
        </Typography>
        {country.provinces && country.provinces.length > 0 && (
          <List sx={{ pl: 2 }}>
            {country.provinces.map(province => (
              <ListItem key={province.provinceId} sx={{ py: 0 }}>
                <Typography variant="body2">{province.name}</Typography>
              </ListItem>
            ))}
          </List>
        )}
      </ListItem>
    ))}
  </List>
);

export default CountriesList;