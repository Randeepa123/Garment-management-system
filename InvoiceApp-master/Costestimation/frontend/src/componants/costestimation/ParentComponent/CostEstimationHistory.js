import React, { useState, useEffect } from "react";
import Axios from "axios"; 
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, TextField } from "@mui/material";
import CostEstimationSheet from "../ChildComponent/CostEstimationSheet"; 

const CostEstimationHistory = () => {
  const [costSheets, setCostSheets] = useState([]);
  const [selectedCostSheet, setSelectedCostSheet] = useState(null); 
  const [expandedSheet, setExpandedSheet] = useState(null); 
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:8070/api/costEstimations') 
      .then((response) => {
        setCostSheets(response.data.response || []); 
      })
      .catch((error) => {
        console.error("Error fetching cost estimations:", error);
      });
  }, []); 


  const handleSelectCostSheet = (costSheet) => {
    if (expandedSheet === costSheet._id) {
      setExpandedSheet(null);
    } else {
      setExpandedSheet(costSheet._id);
      setSelectedCostSheet(costSheet);
    }
  };

  
  const filteredCostSheets = costSheets.filter((costSheet) =>
    costSheet.costSheetID.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ width: "800px" }}>
      <Typography variant="h6" gutterBottom>
        Cost-Estimation History
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search by Cost Sheet ID"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Paper sx={{ padding: 2 }}>
        <List>
          {filteredCostSheets.length === 0 ? (
            <Typography>No cost estimations found.</Typography>
          ) : (
            filteredCostSheets.map((costSheet, index) => (
              <div key={costSheet._id}>
                <ListItem button onClick={() => handleSelectCostSheet(costSheet)}>
                  <ListItemText
                    primary={`#${index + 1} - CostSheet ID: ${costSheet.costSheetID}`} // Add the numbering before the CostSheet ID
                    secondary={
                      <>
                        <Typography variant="body2">Product Name: {costSheet.productName}</Typography>
                        <Typography variant="body2">Total Cost: {costSheet.totalCostSum}</Typography>
                      </>
                    } // Product name and total cost as the secondary info
                  />
                </ListItem>
                {/* Divider with custom styling */}
                <Divider sx={{ my: 2, borderColor: '#b2b8b8', borderWidth: 1 }} />

                {/* Toggle to show full details if the current item is expanded */}
                {expandedSheet === costSheet._id && (
                  <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h6">Full Cost Estimation Details</Typography>
                    <CostEstimationSheet rows={[costSheet]} />
                  </Box>
                )}
              </div>
            ))
          )}
        </List>

        {/* Divider between list and full details */}
        <Divider sx={{ marginY: 2 }} />
      </Paper>
    </Box>
  );
};

export default CostEstimationHistory;
