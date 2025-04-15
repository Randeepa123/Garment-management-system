import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import axios from "axios";

const CostEstiPrimaryData = ({ setCurrentCostSheetID }) => {
  const [costData, setCostData] = useState({
    costSheetID: "",
    productName: "",
    estimatedStartDate: "",
    estimatedEndDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCostData({ ...costData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8070/api/cost-estimations", costData);
      alert("Cost Estimation Created Successfully");
      
      // Pass the new costSheetID to the parent component
      setCurrentCostSheetID(costData.costSheetID);
      
    } catch (error) {
      console.error("Error adding cost estimation:", error);
    }
  };

  return (
    <Box sx={{ padding: 1, display: "flex", flexDirection: "column", gap:2 ,marginRight:"-90px", width:"350px"}}>
      <Typography variant="h6">
        <ControlPointIcon sx={{ marginRight: "5px" }} />
        Create New Cost Estimation
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField sx={{marginTop:"10px"}}label="CostSheet ID" name="costSheetID" value={costData.costSheetID} onChange={handleInputChange} required />
        <TextField sx={{marginTop:"15px"}} label="Product Name" name="productName" value={costData.productName} onChange={handleInputChange} required />
        <TextField sx={{marginTop:"15px",width:"200px"}}label="Estimated Start Date" name="estimatedStartDate" type="date" value={costData.estimatedStartDate} onChange={handleInputChange} required />
        <TextField sx={{marginTop:"15px", display:"flex" , width:"200px"}}label="Estimated End Date" name="estimatedEndDate" type="date" value={costData.estimatedEndDate} onChange={handleInputChange} required />

        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>ADD</Button>
      </form>
    </Box>
  );
};

export default CostEstiPrimaryData;
