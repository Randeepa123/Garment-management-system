import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const CreateCostEstimation = () => {
  const [costData, setCostData] = useState({
    title: "",
    materialsCost: 0,
    laborCost: 0,
    otherExpenses: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCostData({ ...costData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log("Submitted Cost Data:", costData);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Create New Cost Estimation
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={costData.title}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
          <TextField
            label="Materials Cost"
            name="materialsCost"
            value={costData.materialsCost}
            onChange={handleInputChange}
            variant="outlined"
            type="number"
            required
          />
          <TextField
            label="Labor Cost"
            name="laborCost"
            value={costData.laborCost}
            onChange={handleInputChange}
            variant="outlined"
            type="number"
            required
          />
          <TextField
            label="Other Expenses"
            name="otherExpenses"
            value={costData.otherExpenses}
            onChange={handleInputChange}
            variant="outlined"
            type="number"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Create Estimation
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateCostEstimation;
