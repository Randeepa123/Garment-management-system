import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import CostEstiPrimaryData from "../ChildComponent/CostEstiPrimaryData";

const OperationSheet = ({ selectedCostSheet, allowEdit = false, showSubmit = false }) => {
 
  
  const [costSheet, setCostSheet] = useState(selectedCostSheet || {});
  const [totalCost, setTotalCost] = useState(0);
  const [selectedBreakdown, setSelectedBreakdown] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for data fetch

  useEffect(() => {
    // Fetch updated cost estimation sheet when refresh is triggered or selectedCostSheet changes
    const fetchCostSheet = async () => {
      try {
        const response = await axios.get
        (`http://localhost:8070/api/costEstimations?costSheetID=${selectedCostSheet.costSheetID}
`);
        setCostSheet(response.data);
      } catch (error) {
        console.error("Error fetching cost estimation sheet:", error);
      }
    };

    fetchCostSheet();
  }, [selectedCostSheet?.costSheetID]);

  useEffect(() => {
    if (!costSheet?.costBreakdown) return;
    const updatedTotalCost = costSheet.costBreakdown.reduce(
      (sum, breakdown) => sum + breakdown.totalCost,
      0
    );
    setTotalCost(updatedTotalCost);
  }, [costSheet?.costBreakdown]);

  const handleEditClick = (breakdown) => {
    setSelectedBreakdown(breakdown);
  };

  const handleSubmit = () => {
    alert("Cost Estimation Sheet Submitted!");
  };

  if (loading) {
    return <Typography>Loading...</Typography>; 
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2,border:"solid 1px" }}>
      {/* Project Details Section */}
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>
          Project Details
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography>
            <strong>Cost-Sheet ID:</strong> {costSheet?.costSheetID || "N/A"}
          </Typography>
          <Typography>
            <strong>Product Name:</strong> {costSheet?.productName || "N/A"}
          </Typography>
          <Typography>
            <strong>Estimated Start Date:</strong>{" "}
            {costSheet?.estimatedStartDate?.slice(0, 10) || "N/A"}
          </Typography>
          <Typography>
            <strong>Estimated End Date:</strong>{" "}
            {costSheet?.estimatedEndDate?.slice(0, 10) || "N/A"}
          </Typography>
        </Box>
      </Container>

      {/* Cost Breakdown Table */}
      <Typography variant="h6" gutterBottom>
        Cost-Breakdowns
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>No</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Supplier</strong></TableCell>
              <TableCell><strong>Unit Type</strong></TableCell>
              <TableCell><strong>Consumption</strong></TableCell>
              <TableCell><strong>Cost/Unit</strong></TableCell>
              <TableCell><strong>Total</strong></TableCell>
              {allowEdit && <TableCell><strong>Actions</strong></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {costSheet?.costBreakdown?.map((breakdown, index) => (
              <TableRow key={breakdown._id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{breakdown.description || "N/A"}</TableCell>
                <TableCell>{breakdown.supplierName || "N/A"}</TableCell>
                <TableCell>{breakdown.unitType || "N/A"}</TableCell>
                <TableCell>{breakdown.consumption || "N/A"}</TableCell>
                <TableCell>{breakdown.costPerUnit?.toFixed(2) || "N/A"}</TableCell>
                <TableCell>{breakdown.totalCost?.toFixed(2) || "N/A"}</TableCell>
                {allowEdit && (
                  <TableCell>
                    <Button variant="contained" color="error" sx={{ mr: 1 }}>
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(breakdown)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Total Cost */}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Total Cost: ${totalCost.toFixed(2)}
      </Typography>

      {selectedBreakdown && <CostEstiPrimaryData breakdown={selectedBreakdown} />}

   
      {showSubmit && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default OperationSheet;
