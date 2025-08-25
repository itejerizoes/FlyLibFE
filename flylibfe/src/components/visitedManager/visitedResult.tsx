import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Visited } from '../../types/visited';

interface VisitedResultProps {
  visited: Visited | null;
}

const VisitedResult: React.FC<VisitedResultProps> = ({ visited }) => {
  if (!visited) return null;
  return (
    <Paper elevation={2} sx={{ p: 2, mt: 2 }}>
      <Typography>ID: {visited.id}</Typography>
      <Typography>UserId: {visited.userId}</Typography>
      <Typography>ProvinceId: {visited.provinceId}</Typography>
      <Typography>Fotos: {visited.photos?.length ?? 0}</Typography>
    </Paper>
  );
};

export default VisitedResult;