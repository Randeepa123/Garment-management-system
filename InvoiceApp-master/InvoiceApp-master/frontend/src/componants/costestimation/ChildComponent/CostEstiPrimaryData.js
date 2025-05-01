import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, ButtonGroup } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import axios from "axios";

const CostEstiPrimaryData = ({ setCurrentCostSheetID }) => {
  const [costData, setCostData] = useState({
    costSheetID: "",
    productName: "",
    estimatedStartDate: "",
    estimatedEndDate: "",
    Email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isExisting, setIsExisting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCostData({ ...costData, [name]: value });
  };

  // Function to fetch existing cost sheet data
  const fetchExistingCostSheet = async (costSheetID) => {
    if (!costSheetID) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      console.log("Fetching existing cost sheet with ID:", costSheetID);
      const response = await axios.get(`http://localhost:8070/api/costEstimations/${costSheetID}`);
      
      if (response.data && response.data.data) {
        const existingData = response.data.data;
        setCostData({
          costSheetID: existingData.costSheetID || "",
          productName: existingData.productName || "",
          estimatedStartDate: existingData.estimatedStartDate || "",
          estimatedEndDate: existingData.estimatedEndDate || "",
          Email: existingData.Email || "",
        });
        
        // Mark as existing cost sheet
        setIsExisting(true);
        
        // Pass the cost sheet ID to the parent component to update Operation Sheet
        setCurrentCostSheetID(costSheetID);
      }
    } catch (error) {
      console.error("Error fetching cost sheet:", error);
      setError("Failed to fetch cost sheet data. Please check the ID and try again.");
      setIsExisting(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cost sheet ID change and fetch data if it exists
  const handleCostSheetIDChange = (e) => {
    const { value } = e.target;
    setCostData({ ...costData, costSheetID: value });
    
    // If the ID is at least 3 characters, try to fetch existing data
    if (value.length >= 3) {
      fetchExistingCostSheet(value);
    } else {
      // Reset existing flag if ID is too short
      setIsExisting(false);
    }
  };

  // Function to create a new cost sheet
  const createNewCostSheet = async () => {
    // Validate required fields
    if (!costData.costSheetID || !costData.productName || !costData.estimatedStartDate || !costData.estimatedEndDate) {
      setError("All fields are required. Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      console.log("Creating new cost sheet with data:", costData);
      
      // Format dates properly for the backend
      const formattedData = {
        ...costData,
        estimatedStartDate: new Date(costData.estimatedStartDate).toISOString(),
        estimatedEndDate: new Date(costData.estimatedEndDate).toISOString(),
      };
      
      // Use the correct API endpoint
      const response = await axios.post("http://localhost:8070/api/cost-estimations", formattedData);
      console.log("Cost sheet created successfully:", response.data);
      
      // Pass the new costSheetID to the parent component
      setCurrentCostSheetID(costData.costSheetID);
      
      // Mark as existing after creation
      setIsExisting(true);
      
      alert("Cost Estimation Created Successfully");
    } catch (error) {
      console.error("Error adding cost estimation:", error.response?.data || error);
      setError(error.response?.data?.error || "Failed to create cost sheet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to reset the form for a new cost sheet
  const resetForm = () => {
    setCostData({
      costSheetID: "",
      productName: "",
      estimatedStartDate: "",
      estimatedEndDate: "",
      Email:""
    });
    setIsExisting(false);
    setError("");
  };

  return (
    <Box sx={{ padding: 1, display: "flex", flexDirection: "column", gap:2 ,marginRight:"-90px", width:"350px"}}>
      <Typography variant="h6">
        <ControlPointIcon sx={{ marginRight: "5px" }} />
        {isExisting ? "Existing Cost Estimation" : "Create New Cost Estimation"}
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 1 }}>
          {error}
        </Typography>
      )}

      {isExisting && (
        <Typography color="success.main" sx={{ mb: 1 }}>
          Existing cost sheet found. You can add cost breakdowns to it.
        </Typography>
      )}

      <form>
        <TextField 
          sx={{marginTop:"10px"}}
          label="CostSheet ID" 
          name="costSheetID" 
          value={costData.costSheetID} 
          onChange={handleCostSheetIDChange} 
          required 
          disabled={isLoading}
        />
        <TextField 
          sx={{marginTop:"15px"}} 
          label="Product Name" 
          name="productName" 
          value={costData.productName} 
          onChange={handleInputChange} 
          required 
          disabled={isLoading || isExisting}
        />
        <TextField 
          sx={{marginTop:"15px",width:"200px"}}
          label="Estimated Start Date" 
          name="estimatedStartDate" 
          type="date" 
          value={costData.estimatedStartDate} 
          onChange={handleInputChange} 
          required 
          disabled={isLoading || isExisting}
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        <TextField 
          sx={{marginTop:"15px", display:"flex" , width:"200px"}}
          label="Estimated End Date" 
          name="estimatedEndDate" 
          type="date" 
          value={costData.estimatedEndDate} 
          onChange={handleInputChange} 
          required 
          disabled={isLoading || isExisting}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField 
          sx={{marginTop:"15px",width:"200px"}}
          label="Customer Email" 
          name="Email"  
          value={costData.Email} 
          onChange={handleInputChange} 
          required 
          disabled={isExisting}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          {!isExisting && (
            <Button 
              variant="contained" 
              color="primary" 
              onClick={createNewCostSheet}
              disabled={isLoading || !costData.costSheetID || !costData.productName || !costData.estimatedStartDate || !costData.estimatedEndDate}
            >
              {isLoading ? "Loading..." : "CREATE NEW"}
            </Button>
          )}
          
          {isExisting && (
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={resetForm}
              disabled={isLoading}
            >
              CREATE NEW SHEET
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default CostEstiPrimaryData;
