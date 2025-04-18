import React, { useEffect } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import { Router } from 'react-router-dom';  
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import axios from 'axios';
import { FaShirt } from "react-icons/fa6";
import { GiTrousers } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";



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
  color: status === 'Low' ? '#4caf50' : 
         status === 'High' ? '#f44336' : '#ff9800',
  background: status === 'Low' ? '#e8f5e9' : 
              status === 'High' ? '#ffebee' : '#fff8e1',
  display: 'inline-block',
}));


function OrderTable({rows, getOrders}) {

  const navigate = useNavigate();
  const handleAddOrder = () => {    
    console.log("Add Order");
    navigate("/addOrder");
  } 
  const handleupdateOrder = () => {    
    console.log("Update Order");
    navigate("/updateorder");
  } 
  
  const deleteOrder = (Id) => {
    const payload = {jobcardId: Id}
    axios.post('http://localhost:8070/deleteorder', payload)
    .then((response) => {
        getOrders();
       
    })}


  // Function to get the appropriate icon based on product type
  const getOrderIcon = (type) => {
    if(type==="T-Shirts"){
      return <FaShirt fontSize="small" />;
    }if(type==="Trousers"){
      return <GiTrousers fontSize="small" />;
    }
    return <FaShoppingCart fontSize="small" />;
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
        {rows.map((row) => (
          <OrderItem key={row.jobcardId}>
            <Box sx={{ display: 'flex', width: '100%', px: 2 }}>
              <OrderIcon>
                {getOrderIcon(row.styleNumber)}
              </OrderIcon>
              <Box sx={{ ml: 2, flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    Order {row.customer}
                  </Typography>
                  <StatusChip status={row.priority}>
                    {row.priority}
                  </StatusChip>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {row.orderdate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Id:{row.jobcardId}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
            
                    <EditButton 
                    Id= {row.jobcardId}
                    onClick={handleupdateOrder}
                    />
                    <DeleteButton
                      id={row.jobcardId}
                      deleteOrder={deleteOrder}
                    />
                  </Box>
                  
                </Box>
              </Box>
            </Box>
          </OrderItem>
        ))}
      </List>
      <editButton/>
      <deleteButton/>
    </Paper>
    


  )
}

export default OrderTable