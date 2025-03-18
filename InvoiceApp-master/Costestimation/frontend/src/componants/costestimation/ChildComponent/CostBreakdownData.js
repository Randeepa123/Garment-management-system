import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";

const CostBreakdownData = () => {
  const [breakdowns, setBreakdowns] = useState([]);
  const [newBreakdown, setNewBreakdown] = useState({
    description: "",
    supplierName: "",
    unitType: "",
    consumption: "",
    costPerUnit: "",
  });

  const handleInputChange = (e) => {
    setNewBreakdown({ ...newBreakdown, [e.target.name]: e.target.value });
  };

  const addBreakdown = () => {
    const totalCost = newBreakdown.consumption * newBreakdown.costPerUnit;
    setBreakdowns([...breakdowns, { ...newBreakdown, totalCost }]);
    setNewBreakdown({ description: "", supplierName: "", unitType: "", consumption: "", costPerUnit: "" });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/cost-estimation", { costBreakdown: breakdowns });
      alert("Cost Breakdown Submitted Successfully");
    } catch (error) {
      console.error("Error submitting cost breakdown:", error);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1000px", margin: "auto", display: "flex", alignItems: "center" }}>
      {/* Form Section */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "250px" }}>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: "-5px" }}>
          Cost-Breakdown
        </Typography>
        <TextField label="Description" name="description" value={newBreakdown.description} onChange={handleInputChange} fullWidth required />
        <TextField label="Supplier Name" name="supplierName" value={newBreakdown.supplierName} onChange={handleInputChange} fullWidth required />

        {/* Dropdown for Unit Type */}
        <FormControl fullWidth required>
          <InputLabel>Unit Type</InputLabel>
          <Select name="unitType" value={newBreakdown.unitType} onChange={handleInputChange}>
            <MenuItem value="metres">Metres</MenuItem>
            <MenuItem value="pieces">Pieces</MenuItem>
            <MenuItem value="kg">Kilograms</MenuItem>
            <MenuItem value="bundle">Bundle</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Consumption" name="consumption" type="number" value={newBreakdown.consumption} onChange={handleInputChange} fullWidth required />
        <TextField label="Cost per Unit" name="costPerUnit" type="number" value={newBreakdown.costPerUnit} onChange={handleInputChange} fullWidth required />

        <Button variant="contained" color="primary" onClick={addBreakdown} sx={{ width: "100%" }}>
          Add Breakdown
        </Button>
      </Box>
    </Box>
  );
};

export default CostBreakdownData;
