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
import { CostContext } from "../../../contex/CostContex";

const OperationSheet = ({ setEditingItem, allowEdit = true, showSubmit = true }) => {
  const { CostSheetNumber, refresh } = useContext(CostContext);

  const [costSheet, setCostSheet] = useState({});
  const [selectedBreakdown, setSelectedBreakdown] = useState(null);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchCostSheet = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/api/costEstimations?costSheetID=${CostSheetNumber}`
        );
        setCostSheet(response.data);
      } catch (error) {
        console.error("Error fetching cost estimation sheet:", error);
      }
    };

    fetchCostSheet();
  }, [refresh, CostSheetNumber]);

  useEffect(() => {
    if (!costSheet?.costBreakdown) return;
    const updatedTotalCost = costSheet.costBreakdown.reduce(
      (sum, breakdown) => sum + breakdown.totalCost,
      0
    );
    setTotalCost(updatedTotalCost);
  }, [costSheet?.costBreakdown]);

  const handleDeleteItem = async (breakdownId) => {
    try {
      await axios.delete(
        `http://localhost:8070/api/cost-estimations/${costSheet.costSheetID}/cost-breakdown/${breakdownId}`
      );
      setCostSheet((prevSheet) => ({
        ...prevSheet,
        costBreakdown: prevSheet.costBreakdown.filter((item) => item._id !== breakdownId),
      }));
    } catch (error) {
      console.error("Error deleting breakdown:", error);
    }
  };

  const handleSubmit = () => {
    alert("Cost Estimation Sheet Submitted!");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2, border: "solid 1px" }}>
      {/* Project Details */}
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>
          Project Details
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography><strong>Cost-Sheet ID:</strong> {costSheet?.costSheetID || "N/A"}</Typography>
          <Typography><strong>Product Name:</strong> {costSheet?.productName || "N/A"}</Typography>
          <Typography><strong>Estimated Start Date:</strong> {costSheet?.estimatedStartDate?.slice(0, 10) || "N/A"}</Typography>
          <Typography><strong>Estimated End Date:</strong> {costSheet?.estimatedEndDate?.slice(0, 10) || "N/A"}</Typography>
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
                    <Button
                      className="btn btn-warning"
                      onClick={() => setEditingItem(breakdown)}
                      sx={{ color: "white" }}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn btn-danger ms-2"
                      onClick={() => handleDeleteItem(breakdown._id)}
                    >
                      Delete
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

      {/* Primary Data */}
      {selectedBreakdown && <CostEstiPrimaryData breakdown={selectedBreakdown} />}

      {/* Submit Button */}
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
