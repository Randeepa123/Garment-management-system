import React, { useEffect } from 'react'
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


function OrderTable({rows, getOrders}) {

  const navigate = useNavigate();
  const handleAddOrder = () => {    
    console.log("Add Order");
    navigate("/addOrder");
  } 
  
  const deleteOrder = (Id) => {
    const payload = {
      orderId: Id
    }
    axios.post('http://localhost:3001/deleteorder', payload)
    .then((response) => {
        getOrders();
       
    })}


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
        {rows.map((row) => (
          <OrderItem key={row.jobcardId}>
            <Box sx={{ display: 'flex', width: '100%', px: 2 }}>
              <OrderIcon>
                {getOrderIcon()}
              </OrderIcon>
              <Box sx={{ ml: 2, flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    Order {row.customer}
                  </Typography>
                  <StatusChip status={'Cancel'}>
                    {row.customer}
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
                          // Basic information
                                Id= {row.jobcardId}
                                orderDate= {row.orderDate}
                                deliveryDate= {row.deliveryDate}
                                customer= {row.customer}
                                priority= {row.priority}
                                styleNumber= {row.styleNumber}
                                totalQuantity= {row.totalQuantity}
                                description= {row.description}
                                fabricDetails= {row.fabricDetails}
                                color=  {row.color}
                                sizeRange= {row.sizeRange}
                                
                                // Size Distribution
                                sizeDistributionS={row.sizeDistributionS}
                                sizeDistributionM={row.sizeDistributionM}
                                sizeDistributionL={row.sizeDistributionL}
                                sizeDistributionXL={row.sizeDistributionXL}
                                sizeDistribution2XL={row.sizeDistribution2XL}
                                sizeDistribution3XL={row.sizeDistribution3XL}
                                
                                // Size Measurements
                                chestWidthS= {row.chestWidthS}
                                chestWidthM= {row.chestWidthM}
                                chestWidthL= {row.chestWidthL}
                                chestWidthXL= {row.chestWidthXL}
                                chestWidth2XL= {row.chestWidth2XL}
                                chestWidth3XL= {row.chestWidth3XL}
                                
                                bodyLengthS={row.bodyLengthS}
                                bodyLengthM={row.bodyLengthM}
                                bodyLengthL={row.bodyLengthL}
                                bodyLengthXL={row.bodyLengthXL}
                                bodyLength2XL={row.bodyLength2XL}
                                bodyLength3XL={row.bodyLength3XL}
                                
                                shoulderWidthS= {row.shoulderWidthS}
                                shoulderWidthM= {row.shoulderWidthM}
                                shoulderWidthL= {row.shoulderWidthL}
                                shoulderWidthXL= {row.shoulderWidthXL}
                                shoulderWidth2XL= {row.shoulderWidth2XL}
                                shoulderWidth3XL= {row.shoulderWidth3XL}
                                
                                sleeveLengthS= {row.sleeveLengthS}
                                sleeveLengthM= {row.sleeveLengthM}
                                sleeveLengthL= {row.sleeveLengthL}
                                sleeveLengthXL= {row.sleeveLengthXL}
                                sleeveLength2XL= {row.sleeveLength2XL}
                                sleeveLength3XL= {row.sleeveLength3XL}
                                
                                neckWidthS= {row.neckWidthS}
                                neckWidthM= {row.neckWidthM}
                                neckWidthL= {row.neckWidthL}
                                neckWidthXL= {row.neckWidthXL}
                                neckWidth2XL= {row.neckWidth2XL}
                                neckWidth3XL= {row.neckWidth3XL}
                                
                                measurementNotes= {row.measurementNotes}
                                
                                // Design Information
                                frontDesignImageUrl= {row.frontDesignImageUrl}
                                frontDesignNotes= {row.frontDesignNotes}
                                backDesignImageUrl= {row.backDesignImageUrl}
                                backDesignNotes= {row.backDesignNotes}
                                
                                // Production Tracking - Pattern Making
                                patternMakingStartDate= {row.patternMakingStartDate}
                                patternMakingEndDate= {row.patternMakingEndDate}
                                patternMakingSupervisor= {row.patternMakingSupervisor}
                                patternMakingStatus= {row.patternMakingStatus}
                                
                                // Production Tracking - Cutting
                                cuttingStartDate= {row.cuttingStartDate}
                                cuttingEndDate= {row.cuttingEndDate}
                                cuttingSupervisor= { row.cuttingSupervisor}
                                cuttingStatus= { row.cuttingStatus}
                                
                                // Production Tracking - Printing
                                printingStartDate= { row.printingStartDate}
                                printingEndDate= { row.printingEndDate}
                                printingSupervisor= {row.printingSupervisor}
                                printingStatus= {row.printingStatus}
                                
                                // Production Tracking - Sewing
                                sewingStartDate= { row.sewingStartDate}
                                sewingEndDate= { row.sewingEndDate}
                                sewingSupervisor= {row.sewingSupervisor}
                                sewingStatus= {row.sewingStatus}
                                
                                // Production Tracking - Finishing
                                finishingStartDate= {row.finishingStartDate}
                                finishingEndDate= {row.finishingEndDate}
                                finishingSupervisor= { row.finishingSupervisor}
                                finishingStatus= { row.finishingStatus}
                                
                                // Production Tracking - Quality Control
                                qualityControlStartDate= { row.qualityControlStartDate}
                                qualityControlEndDate= { row.qualityControlEndDate}
                                qualityControlSupervisor= {row.qualityControlSupervisor}
                                qualityControlStatus= {row.qualityControlStatus}
                                
                                // Production Tracking - Packaging
                                packagingStartDate= {row.packagingStartDate}
                                packagingEndDate= {row.packagingEndDate}
                                packagingSupervisor= { row.packagingSupervisor}
                                packagingStatus= { row.packagingStatus}
                                
                                // Quality Control Checklist
                                qcMeasurementsCorrect= { row.qcMeasurementsCorrect}
                                qcStitchingQuality= {row.qcStitchingQuality}
                                qcColorMatching={row.qcColorMatching}
                                qcFabricQuality= { row.qcFabricQuality}
                                qcPrintQuality= {row.qcPrintQuality}
                                qcWashTest= {row.qcWashTest}
                                qcFinishing= { row.qcFinishing}
                                qcLabelsAndTags= { row.qcLabelsAndTags}
                                qcNotes= { row.qcNotes}


                    />

                    
                    <DeleteButton
                      id={row.orderId}
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