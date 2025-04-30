import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const CostBreakdownData = ({
  currentCostSheetID,
  onAddBreakdown,
  editingItem,
}) => {
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
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Update form data when editingItem changes
  useEffect(() => {
    if (editingItem) {
      console.log("Editing item received:", editingItem);
      setFormData({
        description: editingItem.description || "",
        supplierName: editingItem.supplierName || "",
        unitType: editingItem.unitType || "",
        consumption: editingItem.consumption || "",
        costPerUnit: editingItem.costPerUnit || "",
      });
      setIsEditing(true);
      setEditingId(editingItem._id);
    } else {
      // Reset form when not editing
      setFormData({
        description: "",
        supplierName: "",
        unitType: "",
        consumption: "",
        costPerUnit: "",
      });
      setIsEditing(false);
      setEditingId(null);
    }
  }, [editingItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  
  const validateFormData = () => {
    if (!formData.description || formData.description.trim() === "") {
      setError("Description is required");
      return false;
    }
    if (!formData.supplierName || formData.supplierName.trim() === "") {
      setError("Supplier Name is required");
      return false;
    }
    if (!formData.unitType || formData.unitType.trim() === "") {
      setError("Unit Type is required");
      return false;
    }

    if (!formData.consumption || isNaN(parseFloat(formData.consumption))) {
      setError("Consumption must be a valid number");
      return false;
    }
    if (!formData.costPerUnit || isNaN(parseFloat(formData.costPerUnit))) {
      setError("Cost Per Unit must be a valid number");
      return false;
    }

    return true;
  }

  const addBreakdown = async () => {
    if (!validateFormData()) {
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
      await axios.post(
        `http://localhost:8070/api/cost-estimations/${currentCostSheetID}/cost-breakdown`,
        { costBreakdown: [newBreakdown] }
      );

      // Add to local state for display
      setBreakdowns((prev) => [...prev, newBreakdown]);

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
      console.error(
        "Error adding breakdown:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.error || "Failed to add breakdown");
      setTimeout(() => setError(""), 3000);
    }
  };

  const updateBreakdown = async () => {
    if (!validateFormData()) {
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (!currentCostSheetID) {
      setError("Cost Sheet ID is missing!");
      return;
    }

    if (!editingId) {
      setError("No breakdown selected for editing!");
      return;
    }

    const updatedBreakdown = {
      ...formData,
      consumption: parseFloat(formData.consumption),
      costPerUnit: parseFloat(formData.costPerUnit),
    };

    try {
      console.log("Updating breakdown with ID:", editingId);
      console.log("Cost Sheet ID:", currentCostSheetID);
      console.log("Updated breakdown data:", updatedBreakdown);

      // Update the breakdown
      const response = await axios.put(
        `http://localhost:8070/api/cost-estimations/${currentCostSheetID}/cost-breakdown/${editingId}`,
        updatedBreakdown
      );

      console.log("Update response:", response.data);

      // Notify parent to refresh the operation sheet
      onAddBreakdown([updatedBreakdown]);

      // Reset the form and editing state
      setFormData({
        description: "",
        supplierName: "",
        unitType: "",
        consumption: "",
        costPerUnit: "",
      });
      setIsEditing(false);
      setEditingId(null);

      setSuccess("Breakdown updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
      setError("");
    } catch (error) {
      console.error(
        "Error updating breakdown:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.error ||
          "Failed to update breakdown. Please try again."
      );
      setTimeout(() => setError(""), 3000);
    }
  };


  //Done
  const cancelEdit = () => {
    setFormData({
      description: "",
      supplierName: "",
      unitType: "",
      consumption: "",
      costPerUnit: "",
    });
    setIsEditing(false);
    setEditingId(null);
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
      console.log(
        "Submitting cost breakdown for sheet ID:",
        currentCostSheetID
      );
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
      setError(
        error.response?.data?.error || "Failed to submit cost breakdown"
      );

      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        p: 1,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "#fff",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        {isEditing ? "Edit Cost Breakdown" : "Cost Breakdown Data"}
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

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: -1,
          height: "450px",
        }}
      >
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

        <Box sx={{ justifyContent: "space-between", mt: 2 }}>
          {isEditing ? (
            <>
              <Button
                sx={{ height: "50px" }}
                variant="contained"
                color="primary"
                onClick={updateBreakdown}
              >
                Update Breakdown
              </Button>
              <Button
                sx={{ height: "50px" }}
                variant="outlined"
                color="secondary"
                onClick={cancelEdit}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              sx={{ height: "50px" }}
              variant="contained"
              color="primary"
              onClick={addBreakdown}
            >
              Add Breakdown
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CostBreakdownData;
