import React from 'react'
import AddOrder from "../../../pages/Order_Management/AddOrder";
import { Routes, Route,navigate, useNavigate} from 'react-router-dom';
import { 
  Paper, 
  Box, 
  Typography, 
  IconButton, 
  List, 
  ListItem, 
  Avatar,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Router } from 'react-router-dom';

const OrderItem = styled(ListItem)(({ theme }) => ({
  borderBottom: '1px solid #f0f0f0',
  padding: theme.spacing(2, 0),
}));

const OrderIcon = styled(Avatar)(({ theme }) => ({
  backgroundColor: '#e0f2f1',
  color: '#009688',
  width: 40,
  height: 40,
}));

const StatusChip = styled('div')(({ status }) => ({
  padding: '3px 10px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 'bold',
  color: status === 'Completed' ? '#4caf50' : 
         status === 'Cancel' ? '#f44336' : '#ff9800',
  background: status === 'Completed' ? '#e8f5e9' : 
              status === 'Cancel' ? '#ffebee' : '#fff8e1',
  display: 'inline-block',
}));


function OrderTable() {

  const navigate = useNavigate();
  const handleAddOrder = () => {
    console.log("Add Order");
    navigate("/addOrder");
  } 

  const orderList = [
    { id: '01', type: 'tshirt', date: 'May 18th, 2026', status: 'Pending', orderNumber: 'OTBB8486924' },
    { id: '02', type: 'pants', date: 'May 18th, 2026', status: 'Pending', orderNumber: 'OTBB8487924' },
    { id: '03', type: 'jacket', date: 'May 18th, 2026', status: 'Cancel', orderNumber: 'OTBB8488924' },
    { id: '04', type: 'jacket', date: 'May 18th, 2026', status: 'Completed', orderNumber: 'OTBB8489924' },
    { id: '05', type: 'pants', date: 'May 18th, 2026', status: 'Completed', orderNumber: 'OTBB8481024' },
    { id: '06', type: 'pants', date: 'May 18th, 2026', status: 'Completed', orderNumber: 'OTBB8481124' },
    { id: '07', type: 'tshirt', date: 'May 18th, 2026', status: 'Completed', orderNumber: 'OTBB8481224' },
  ];

  // Function to get the appropriate icon based on product type
  const getOrderIcon = (type) => {
    // This could be expanded to show different icons for different product types
    return <ShoppingCartIcon fontSize="small" />;
  };

  return (
    <Paper sx={{ p: 0, borderRadius: '10px',width: '50%' }}>
      {/* Table header */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Orders
        </Typography>
        <IconButton 
          onClick={handleAddOrder}
          size="large" 
          sx={{ 
            color: '#0288d1',
          }}
        >
          <AddCircleIcon />
        </IconButton>
      </Box>
      <Divider />
      
      {/* Order list */}
      <List disablePadding>
        {orderList.map((order) => (
          <OrderItem key={order.id}>
            <Box sx={{ display: 'flex', width: '100%', px: 2 }}>
              <OrderIcon>
                {getOrderIcon(order.type)}
              </OrderIcon>
              <Box sx={{ ml: 2, flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    Order {order.id}
                  </Typography>
                  <StatusChip status={order.status}>
                    {order.status}
                  </StatusChip>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {order.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {order.orderNumber}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </OrderItem>
        ))}
      </List>
    </Paper>


  )
}

export default OrderTable