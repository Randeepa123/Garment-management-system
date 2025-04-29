import React from 'react'

import { 
    Paper, 
    Box, 
    Typography, 
    Avatar,
    LinearProgress
  } from '@mui/material';
  import { styled } from '@mui/material/styles';

  const ProgressLabel = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    marginBottom: '5px',
  });

  function OrderProgress({getOrders,rows}) {
  return (
    <Paper sx={{ p: 3, borderRadius: '10px', height: '100%',width: '50%' }}>
    <Typography variant="h6" sx={{ fontWeight: 500, mb: 3 }}>
      Overall Order Progress
    </Typography>
    
    {rows.map((row) => (
      <Box key={row.id} sx={{ mb: 2.5 }}>
        <ProgressLabel>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: '#e0e0e0', fontSize: '0.75rem' }}>
              {row.id}
            </Avatar>
            <Typography variant="body2">
              Order {row.jobcardId}
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight={500}>
          {parseFloat(row.progress).toFixed(2)}%
          </Typography>
        </ProgressLabel>
        <LinearProgress 
          variant="determinate" 
          value={row.progress} 
          sx={{ 
            height: 8, 
            borderRadius: 4,
            bgcolor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#0288d1',
            }
          }} 
        />
      </Box>
    ))}
  </Paper>
  )}


export default OrderProgress