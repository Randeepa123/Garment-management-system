import React from "react";
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

const CostEstimationSheet = ({ rows, costData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        border: "2px solid #000",
        padding: 2,
        marginLeft: "20px",
        backgroundColor: "#f4f6f6",
      }}
    >
      {/* Project Details Section */}
      <Container maxWidth="lg" sx={{ mt: 4, width: "600px" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Project Details
        </Typography>
        {rows?.map((row) => (
          <Box key={row._id} sx={{ mb: 2 }}>
            <Typography>
              <strong>Cost-Sheet ID:</strong> {row.costSheetID || "N/A"}
            </Typography>
            <Typography>
              <strong>Product Name:</strong> {row.productName || "N/A"}
            </Typography>
            <Typography>
              <strong>Estimated Start Date:</strong>{" "}
              {row.estimatedStartDate?.slice(0, 10) || "N/A"}
            </Typography>
            <Typography>
              <strong>Estimated End Date:</strong>{" "}
              {row.estimatedEndDate?.slice(0, 10) || "N/A"}
            </Typography>
          </Box>
        ))}
      </Container>
      <Typography variant="h6" sx={{ marginBottom:"-10px",marginLeft:"19px"}}>
          Cost-Breakdowns
        </Typography>

      {/* Cost Breakdown Section */}
      <Container maxWidth="lg" sx={{ mt: 4, width: "600px" }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>No</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Supplier Name</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Cost per Unit</strong></TableCell>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.description || "N/A"}</TableCell>
                  <TableCell>{row.supplierName || "N/A"}</TableCell>
                  <TableCell>{row.consumption || "N/A"}</TableCell>
                  <TableCell>{row.costPerUnit || "N/A"}</TableCell>
                  <TableCell>{row.totalCost || "N/A"}</TableCell>
                  <TableCell>
                    {/* Action Buttons */}
                    <Button
                      sx={{ marginRight: "5px" }}
                      onClick={() => alert("Update feature not implemented")}
                    >
                      Edit
                    </Button>
                    <Button
                      sx={{ marginLeft: "5px" }}
                      color="error"
                      onClick={() => alert("Delete feature not implemented")}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Total Cost */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Total Cost: {costData?.totalCostSum || "N/A"}
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="contained" color="error" sx={{ mr: 2 }}>
            DELETE
          </Button>
          <Button variant="contained" color="primary">
            SUBMIT
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CostEstimationSheet;
