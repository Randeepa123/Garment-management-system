import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Paper, 
  Box, 
  Typography, 
  IconButton, 
  List, 
  ListItem, 
  Avatar,
  Divider,
  TextField,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { FaShirt } from "react-icons/fa6";
import { GiTrousers } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

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

const SearchBar = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(2),
  width: 'calc(100% - 32px)',
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    backgroundColor: '#f5f5f5',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      boxShadow: '0 0 0 2px rgba(2, 136, 209, 0.2)',
    },
  },
}));

const EmptyResults = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  '& svg': {
    fontSize: 48,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.disabled,
  },
}));

function OrderTable({ rows, getOrders }) {
  // Define state variables for search and filtered rows
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRows, setFilteredRows] = useState([]);

  const navigate = useNavigate();
  
  // Initialize filteredRows with all rows when component mounts
  useEffect(() => {
    setFilteredRows(rows || []);
  }, []);
  
  // Update filtered rows whenever rows or searchTerm changes
  useEffect(() => {
    if (!searchTerm || !searchTerm.trim()) {
      setFilteredRows(rows || []);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = (rows || []).filter(row => 
        (row.customer && row.customer.toLowerCase().includes(searchTermLower)) || 
        (row.jobcardId && row.jobcardId.toString().includes(searchTermLower))
      );
      setFilteredRows(filtered);
    }
  }, [searchTerm, rows]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddOrder = () => {    
    console.log("Add Order");
    navigate("/addOrder");
  };

  const handleupdateOrder = () => {    
    console.log("Update Order");
    navigate("/updateorder");
  };
  
  const deleteOrder = (Id) => {
    const payload = { jobcardId: Id };
    axios.post('http://localhost:8070/deleteorder', payload)
    .then((response) => {
      getOrders();
    });
  };

  // Function to get the appropriate icon based on product type
  const getOrderIcon = (type) => {
    if (type === "T-Shirts") {
      return <FaShirt fontSize="small" />;
    }
    if (type === "Trousers") {
      return <GiTrousers fontSize="small" />;
    }
    return <FaShoppingCart fontSize="small" />;
  };

  return (
    <Paper sx={{ p: 0, borderRadius: '10px', width: '50%' }}>
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
      
      {/* Search Bar */}
      <SearchBar
        placeholder="Search by order name or ID..."
        value={searchTerm}
        onChange={handleSearchChange}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      
      {/* Order list */}
      {filteredRows && filteredRows.length > 0 ? (
        <List disablePadding>
          {filteredRows.map((row) => (
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
                      Id: {row.jobcardId}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                      <EditButton 
                        Id={row.jobcardId}
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
      ) : (
        <EmptyResults>
          <FaShoppingCart />
          <Typography variant="body1">No orders match your search</Typography>
          <Typography variant="body2">Try a different search term</Typography>
        </EmptyResults>
      )}
    </Paper>
  );
}

export default OrderTable;