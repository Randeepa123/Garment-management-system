import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box, List, ListItem, ListItemText } from "@mui/material";


const CostBreakdownData = ({ currentCostSheetID, onAddBreakdown }) => {
  const [breakdowns, setBreakdowns] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    supplierName: "",
    unitType: "",
    consumption: "",
    costPerUnit: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addBreakdown = async () => {
    if (!Object.values(formData).every(field => field.trim() !== "")) {
      setError("Please fill all fields before adding.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!currentCostSheetID) {
      setError("Cost Sheet ID is missing!");
      return;
    }

    const newBreakdown = {
      ...formData,
      consumption: parseFloat(formData.consumption),
      costPerUnit: parseFloat(formData.costPerUnit),
    };

    try {
      console.log("Adding breakdown for sheet ID:", currentCostSheetID);
      // Submit the single breakdown immediately
      await axios.post(
        `http://localhost:8070/api/cost-estimations/${currentCostSheetID}/cost-breakdown`,
        { costBreakdown: [newBreakdown] }
      );

      // Add to local state for display
      setBreakdowns(prev => [...prev, newBreakdown]);
      
      // Notify parent to refresh the operation sheet
      onAddBreakdown([newBreakdown]);
      
      // Clear the form
      setFormData({
        description: "",
        supplierName: "",
        unitType: "",
        consumption: "",
        costPerUnit: "",
      });
      
      setSuccess("Breakdown added successfully!");
      setTimeout(() => setSuccess(""), 3000);
      setError("");
    } catch (error) {
      console.error("Error adding breakdown:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to add breakdown");
      setTimeout(() => setError(""), 3000);
    }
  };

  const submitBreakdown = async () => {
    if (!currentCostSheetID) {
      setError("Cost Sheet ID is missing!");
      return;
    }

    if (breakdowns.length === 0) {
      setError("Please add at least one breakdown before submitting.");
      return;
    }

    try {
      console.log("Submitting cost breakdown for sheet ID:", currentCostSheetID);
      await axios.post(
        `http://localhost:8070/api/cost-estimations/${currentCostSheetID}/cost-breakdown`,
        { costBreakdown: breakdowns }
      );

      onAddBreakdown(breakdowns); // Notify parent about new breakdowns
      setSuccess("Cost breakdown submitted successfully!");
      setBreakdowns([]);
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Submission error:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to submit cost breakdown");
      
      setTimeout(() => setError(""), 3000);
    }
  };


  return (
    <Box sx={{ maxWidth: 800, margin: "auto", p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "#fff" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Cost Breakdown Data
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {success && (
        <Typography color="green" sx={{ mb: 2 }}>
          {success}
        </Typography>
      )}

      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2,height:"600px" }}>
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          required
        />
                  <TextField
            label="Supplier Name"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            />

            <TextField
            label="Unit Type"
            name="unitType"
            value={formData.unitType}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            />

            <TextField
            label="Consumption"
            name="consumption"
            type="number"
            value={formData.consumption}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            />

            <TextField
            label="Cost Per Unit"
            name="costPerUnit"
            type="number"
            value={formData.costPerUnit}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            required
            />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button sx={{height:"50px"}} variant="contained" color="primary" onClick={addBreakdown}>
            Add Breakdown
          </Button>
          
        </Box>
      </Box>

      {breakdowns.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Added Breakdowns
          </Typography>
    {/*   <List>
            {breakdowns.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${item.description} - ${item.supplierName}`}
                  secondary={`${item.consumption} ${item.unitType} @ ${item.costPerUnit} = ${item.consumption * item.costPerUnit}`}
                />
              </ListItem>
            ))}
          </List> */}
        </Box>
      )}
    </Box>
  );
};

export default CostBreakdownData;
