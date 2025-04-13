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

  function OrderProgress() {
    // Sample order progress data
    const orderProgress = [
      { id: '01', progress: 38 },
      { id: '02', progress: 25 },
      { id: '03', progress: 65 },
      { id: '04', progress: 65 },
      { id: '05', progress: 65 },
      { id: '06', progress: 65 },
      { id: '07', progress: 65 },
    ];
  return (
    <Paper sx={{ p: 3, borderRadius: '10px', height: '100%',width: '50%' }}>
    <Typography variant="h6" sx={{ fontWeight: 500, mb: 3 }}>
      Overall Order Progress
    </Typography>
    
    {orderProgress.map((order) => (
      <Box key={order.id} sx={{ mb: 2.5 }}>
        <ProgressLabel>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: '#e0e0e0', fontSize: '0.75rem' }}>
              {order.id}
            </Avatar>
            <Typography variant="body2">
              Order {order.id}
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight={500}>
            {order.progress}%
          </Typography>
        </ProgressLabel>
        <LinearProgress 
          variant="determinate" 
          value={order.progress} 
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