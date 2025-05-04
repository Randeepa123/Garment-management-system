import React from 'react'
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

import { 
  Grid, 
  Box, 
  Typography, 
  IconButton, 
  Button, 
  Card,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Custom styled card component
const StatCard = styled(Card)(({ theme }) => ({
  height: '100%',
  position: 'relative',
  padding: theme.spacing(2),
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.04)',
}));

const ArrowForwardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
    </svg>
  );


function OrdersCountBoxes({rows}) {

  console.log("Rows in boxes:",rows)

  const pendingCount = rows.filter(row => row.status === 'Pending').length;
  const completedCount = rows.filter(row => row.status === 'Completed').length;
  const urgentCount = rows.filter(row => row.priority === 'High').length;
  const delayedCount = rows.filter(row => row.status === 'Delayed').length;

  console.log("Delayed count:",pendingCount)

    const orderSummary = [
        { title: 'Pending Orders', count: pendingCount, icon: <Inventory2OutlinedIcon /> },
        { title: 'Completed Orders', count: completedCount, icon: <Inventory2OutlinedIcon /> },
        { title: 'Urgent Orders', count: urgentCount, icon: <Inventory2OutlinedIcon /> },
        { title: 'Delayed Orders', count: delayedCount, icon: <Inventory2OutlinedIcon /> },
      ];
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {orderSummary.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StatCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {item.count}
                </Typography>
              </Box>
              <IconButton 
                size="small" 
                sx={{ 
                  bgcolor: '#e1f5fe', 
                  color: '#0288d1',
                  '&:hover': {
                    bgcolor: '#b3e5fc',
                  }
                }}
              >
                {item.icon}
              </IconButton>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            </Box>
          </StatCard>
        </Grid>
      ))}
    </Grid>
  )
}

export default OrdersCountBoxes