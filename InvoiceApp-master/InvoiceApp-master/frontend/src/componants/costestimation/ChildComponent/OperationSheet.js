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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CostEstiPrimaryData from "../ChildComponent/CostEstiPrimaryData";
import { CostContext } from "../../../contex/CostContex";
import emailjs from '@emailjs/browser';



const OperationSheet = ({
  setEditingItem,
  allowEdit = true,
  showSubmit = true,
}) => {
  const { CostSheetNumber, refresh, setRefresh } = useContext(CostContext);

  const [costSheet, setCostSheet] = useState({});
  const [selectedBreakdown, setSelectedBreakdown] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  

  useEffect(() => {
    const fetchCostSheet = async () => {
      if (!CostSheetNumber) return; 

      try {
        console.log("Fetching cost sheet with ID:", CostSheetNumber);
        const response = await axios.get(
          `http://localhost:8070/api/costEstimations/${CostSheetNumber}`
        );
        console.log("Fetched cost sheet data:", response.data);
        setCostSheet(response.data.data || {});
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

  const handleEditItem = (breakdown) => {
    console.log("Editing breakdown:", breakdown);
    setEditingItem({
      _id: breakdown._id,
      description: breakdown.description,
      supplierName: breakdown.supplierName,
      unitType: breakdown.unitType,
      consumption: breakdown.consumption,
      costPerUnit: breakdown.costPerUnit,
      totalCost: breakdown.totalCost,
    });
  };

  const handleDeleteClick = (breakdown) => {
    setItemToDelete(breakdown);
    setDeleteDialogOpen(true);
    setDeleteError("");
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete || !itemToDelete._id) {
      console.error("No item selected for deletion or missing ID");
      setDeleteDialogOpen(false);
      return;
    }

    try {
      console.log("Deleting breakdown with ID:", itemToDelete._id);
      console.log("Cost Sheet ID:", costSheet.costSheetID);

      // Send the data in the request body as expected by the backend
      const response = await axios.delete(
        `http://localhost:8070/api/cost-estimations/${costSheet.costSheetID}/cost-breakdown/${itemToDelete._id}`,
        {
          data: {
            costSheetID: costSheet.costSheetID,
            breakdownId: itemToDelete._id,
          },
        }
      );

      console.log("Delete response:", response.data);

      // Update local state
      setCostSheet((prevSheet) => ({
        ...prevSheet,
        costBreakdown: prevSheet.costBreakdown.filter(
          (item) => item._id !== itemToDelete._id
        ),
      }));

      // Trigger refresh
      setRefresh((prev) => prev + 1);

      // Close dialog
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting breakdown:", error.response?.data || error);
      setDeleteError(
        error.response?.data?.error ||
          "Failed to delete breakdown. Please try again."
      );
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
    setDeleteError("");
  };

  // Modified handleSubmit function
const handleSubmit = () => {
  // Add console logs to debug the values
  console.log("Customer Email:", costSheet?.customerEmail);
  console.log("Cost Sheet Number:", CostSheetNumber);
  
  if (!costSheet?.Email) {
    console.error("Missing customer email in costSheet:", costSheet);
    alert("Missing customer email. Please check customer details.");
    return;
  }
  
  if (!CostSheetNumber) {
    console.error("Missing CostSheetNumber from context");
    alert("Missing estimation ID. Please ensure a cost sheet is selected.");
    return;
  }

  // Proceed with sending email
  sendEstimationEmail(costSheet.Email, costSheet,CostSheetNumber);
};

// Modified email sending function
const sendEstimationEmail = async (customerEmail, estimationData, CostSheetNumber) => {
  console.log("Sending email with:", { customerEmail, CostSheetNumber });
  
  // Make sure we have valid data
  if (!customerEmail || !CostSheetNumber) {
    console.error("Missing required email parameters:", { customerEmail, CostSheetNumber });
    alert("Cannot send email: missing customer email or estimation ID");
    return;
  }
  
  const templateParams = {
    to_email: customerEmail,
    estimation_id: CostSheetNumber,
    estimation_data: JSON.stringify({
      productName: estimationData.productName,
      costSheetID: estimationData.costSheetID,
      totalCost: totalCost.toFixed(2),
      // Don't send the entire object as it might be too large
    }, null, 2),
    approve_link: `http://localhost:8070/api/response?id=${CostSheetNumber}&action=approve`,
    decline_link: `http://localhost:8070/api/response?id=${CostSheetNumber}&action=decline`,
  };

  try {
    console.log("Email template params:", templateParams);
    const result = await emailjs.send(
      'service_i2v3i9i',
      'template_8y76bqs',
      templateParams,
      'qyUkudv6sfdzHVF-Y'
    );
    console.log("Email sent successfully:", result);
    alert("Estimation email sent to customer!");
  } catch (error) {
    console.error("Email sending failed:", error);
    alert(`Failed to send email: ${error.message}`);
  }
};
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        border: "solid 1px",
      }}
    >
      {/* Project Details */}
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

     
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }}>
            <TableHead>
              <TableRow>
                <TableCell><strong>No</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Supplier</strong> </TableCell>
                  <TableCell> <strong>Unit Type</strong> </TableCell>
                <TableCell> <strong>Consumption</strong></TableCell>
                 <TableCell><strong>Cost/Unit</strong> </TableCell>
                  <TableCell> <strong>Total</strong>  </TableCell>
                 
                {allowEdit && (
                  <TableCell> <strong>Actions</strong> </TableCell>
                   
                )}
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
                  <TableCell>
                    {breakdown.costPerUnit?.toFixed(2) || "N/A"}
                  </TableCell>
                  <TableCell>
                    {breakdown.totalCost?.toFixed(2) || "N/A"}
                  </TableCell>
                  {allowEdit && (
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <Button
                          variant="contained"
                          color="warning"
                          size="small"
                          onClick={() => handleEditItem(breakdown)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDeleteClick(breakdown)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Total Cost */}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Total Cost: ${totalCost.toFixed(2)}
      </Typography>

      {/* Primary Data */}
      {selectedBreakdown && (
        <CostEstiPrimaryData breakdown={selectedBreakdown} />
      )}

      {/* Submit Button */}
      {showSubmit && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit }

          >
            Submit
          </Button>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this cost breakdown?
          </Typography>
          {itemToDelete && (
            <Box sx={{ mt: 2 }}>
              <Typography>
                <strong>Description:</strong> {itemToDelete.description}
              </Typography>
              <Typography>
                <strong>Supplier:</strong> {itemToDelete.supplierName}
              </Typography>
              <Typography>
                <strong>Total Cost:</strong> $
                {itemToDelete.totalCost?.toFixed(2)}
              </Typography>
            </Box>
          )}
          {deleteError && (
            <Typography color="error" sx={{ mt: 2 }}>
              {deleteError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OperationSheet;
