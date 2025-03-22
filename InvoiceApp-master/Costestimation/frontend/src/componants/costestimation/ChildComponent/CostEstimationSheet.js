import React, { useState } from "react";
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
import CostEstiPrimaryData from "../ChildComponent/CostEstiPrimaryData"; // Import the Edit component

const CostEstimationSheet = ({ rows, allowEdit = false, showSubmit = false }) => {
  const [selectedBreakdown, setSelectedBreakdown] = useState(null); // Store selected breakdown to pass to Edit component
  const selectedCostSheet = rows?.[0] || {};
  const costBreakdowns = selectedCostSheet.costBreakdown || [];

  const handleEditClick = (breakdown) => {
    setSelectedBreakdown(breakdown); // Set the selected breakdown for editing
  };


  const handleSubmit = () => {
    alert("Cost Estimation Sheet Submitted!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "2px solid #000",
        padding: 1,
        marginLeft: "10px",
        backgroundColor: "#f4f6f6",
      }}
    >
      {/* Project Details Section */}
      <Container maxWidth="lg" sx={{ mt: 4, width: "660px" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Project Details
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography>
            <strong>Cost-Sheet ID:</strong> {selectedCostSheet.costSheetID || "N/A"}
          </Typography>
          <Typography>
            <strong>Product Name:</strong> {selectedCostSheet.productName || "N/A"}
          </Typography>
          <Typography>
            <strong>Estimated Start Date:</strong>{" "}
            {selectedCostSheet.estimatedStartDate?.slice(0, 10) || "N/A"}
          </Typography>
          <Typography>
            <strong>Estimated End Date:</strong>{" "}
            {selectedCostSheet.estimatedEndDate?.slice(0, 10) || "N/A"}
          </Typography>
        </Box>
      </Container>

      <Typography variant="h6" sx={{ marginBottom: "-10px", marginLeft: "19px" }}>
        Cost-Breakdowns
      </Typography>

      {/* Cost Breakdown Section */}
      <Container sx={{ mt: 4, width: "700px" }}>
        <TableContainer component={Paper} sx={{ width: "670px" }}>
          <Table sx={{ width: "600px" }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>No</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Supplier Name</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Cost per Unit</strong></TableCell>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {costBreakdowns.map((breakdown, index) => (
                <TableRow key={breakdown._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{breakdown.description || "N/A"}</TableCell>
                  <TableCell>{breakdown.supplierName || "N/A"}</TableCell>
                  <TableCell>{breakdown.consumption || "N/A"}</TableCell>
                  <TableCell>{breakdown.costPerUnit || "N/A"}</TableCell>
                  <TableCell>{breakdown.totalCost || "N/A"}</TableCell>
                  <TableCell>
                    {allowEdit && (
                      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                        <Button variant="contained" color="error" sx={{ mr: 2 }}>
                          DELETE
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditClick(breakdown)} // Trigger edit and pass the breakdown
                        >
                          EDIT
                        </Button>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Total Cost */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Total Cost: {selectedCostSheet.totalCostSum || "N/A"}
        </Typography>
      </Container>

      {/* Display Edit Form when breakdown is selected */}
      {selectedBreakdown && <CostEstiPrimaryData breakdown={selectedBreakdown} />}

      {/* Show submit button if the 'showSubmit' flag is true */}
      {showSubmit && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            SUBMIT
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CostEstimationSheet;
