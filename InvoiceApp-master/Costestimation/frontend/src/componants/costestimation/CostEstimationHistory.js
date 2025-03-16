import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

const CostEstimationHistory = () => {
  const [costHistory, setCostHistory] = useState([]);

  useEffect(() => {
    
    const fetchHistory = async () => {
      const fetchedHistory = [
        { id: 1, title:"Cost Estimation 1", totalCost: 500 },
        { id: 2, title:"Cost Estimation 2", totalCost: 300 },
      ];
      setCostHistory(fetchedHistory);
    };

    fetchHistory();
  }, []);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Cost Estimation History
      </Typography>
      <Paper sx={{ padding: 2 }}>
        {costHistory.length === 0 ? (
          <Typography>No cost estimations found.</Typography>
        ) : (
          <List>
            {costHistory.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.title}
                  secondary={`Total Cost: $${item.totalCost}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default CostEstimationHistory;
