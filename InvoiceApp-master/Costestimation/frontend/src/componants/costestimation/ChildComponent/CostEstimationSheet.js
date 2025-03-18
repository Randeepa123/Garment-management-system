import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Table, TableBody, TableCell, 
         TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const CostEstimationSheet = () => {
  const [costData, setCostData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status

  useEffect(() => {
    // Simulating a mock API response for testing
    const mockResponse = {
      costSheetID: "4005",
      productName: "T-Shirt Manufacturing",
      estimatedStartDate: "2025-04-01",
      estimatedEndDate: "2025-04-10",
      costBreakdown: [
        {
          _id: "1",
          description: "Cotton Fabric",
          supplierName: "ABC Textiles",
          unitType: "Meter",
          consumption: 100,
          costPerUnit: 5,
          totalCost: 500,
        },
        {
          _id: "2",
          description: "Thread",
          supplierName: "XYZ Threads",
          unitType: "Spool",
          consumption: 30,
          costPerUnit: 2,
          totalCost: 60,
        },
        {
          _id: "3",
          description: "Buttons",
          supplierName: "Button Supply Co.",
          unitType: "Piece",
          consumption: 200,
          costPerUnit: 0.1,
          totalCost: 20,
        },
        {
          _id: "4",
          description: "Labor (Stitching)",
          supplierName: "Skilled Laborers",
          unitType: "Hour",
          consumption: 50,
          costPerUnit: 10,
          totalCost: 500,
        }
      ],
      totalCostSum: 1080,
    };

    // Set the mock data to state
    setCostData(mockResponse);

  }, []);

  const handleDeleteSheet = async () => {
    try {
      // Simulating delete action for testing
      alert("Cost Sheet deleted successfully");
    } catch (error) {
      console.error("Error deleting cost sheet:", error);
    }
  };

  const handleSubmitSheet = async () => {
    try {
      // Simulating submit action for testing
      setIsSubmitted(true); // Set submitted status to true
      alert("Cost Sheet submitted for manager approval");
    } catch (error) {
      console.error("Error submitting cost sheet:", error);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 2,
      border: '2px solid #000',
      padding: 2,
      marginLeft: "20px",
      backgroundColor: "#f4f6f6"
    }}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Project Details
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body1" sx={{ marginRight: "150px" }}><strong>Cost Sheet ID:</strong> {costData?.costSheetID || "N/A"}</Typography>
          <Typography variant="body1"><strong>Product Name:</strong> {costData?.productName || "N/A"}</Typography>
          <Typography variant="body1"><strong>Estimated Start Date:</strong> {costData?.estimatedStartDate?.slice(0, 10) || "N/A"}</Typography>
          <Typography variant="body1" sx={{ marginLeft: "53px" }}><strong>Estimated End Date:</strong> {costData?.estimatedEndDate?.slice(0, 10) || "N/A"}</Typography>
        </Box>

        <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
          Cost Breakdown
        </Typography>

        {costData?.costBreakdown?.length > 0 ? (
          <TableContainer component={Paper} sx={{ width: "600px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>No</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell><strong>Supplier Name</strong></TableCell>
                  <TableCell><strong>Unit Type</strong></TableCell>
                  <TableCell><strong>Quantity</strong></TableCell>
                  <TableCell><strong>Cost per Unit</strong></TableCell>
                  <TableCell><strong>Total</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {costData?.costBreakdown?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.supplierName}</TableCell>
                    <TableCell>{item.unitType}</TableCell>
                    <TableCell>{item.consumption}</TableCell>
                    <TableCell>{item.costPerUnit}</TableCell>
                    <TableCell>{item.totalCost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No cost breakdown available.
          </Typography>
        )}

        {/* Display total cost */}
        <Typography variant="h6" sx={{ mt: 3 }}>
          Total Cost: {costData?.totalCostSum || "N/A"}
        </Typography>

        {/* Action buttons */}
        {!isSubmitted ? (
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" onClick={handleSubmitSheet}>
              Submit Sheet
            </Button>
          </Box>
        ) : (
          <Typography variant="body1" color="green" sx={{ mt: 3 }}>
            Cost Sheet has been submitted for approval.
          </Typography>
        )}

      
      
      </Container>
    </Box>
  );
};

export default CostEstimationSheet;
