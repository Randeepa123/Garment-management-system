import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CardHeader, Divider, Container } from "@mui/material";

import CostEstiPrimaryData from "../ChildComponent/CostEstiPrimaryData";
import CostBreakdownData from "../ChildComponent/CostBreakdownData";
import OperationSheet from "../ChildComponent/OperationSheet";
import { CostContext } from "../../../contex/CostContex";

const CreateCostEstimation = () => {
  const [CostSheetNumber, setCostSheetNumber] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [editingItem, setEditingItem] = useState(null);

  // Function to handle refresh when cost breakdown is added
  const handleBreakdownAdded = (breakdowns) => {
    console.log("Cost breakdown added, refreshing operation sheet", breakdowns);
    // Increment refresh counter to trigger re-fetch in OperationSheet
    setRefresh(prev => prev + 1);
  };

  // Function to handle cost sheet ID change
  const handleCostSheetIDChange = (id) => {
    console.log("Cost sheet ID changed to:", id);
    setCostSheetNumber(id);
    // Trigger a refresh to fetch the data for the new cost sheet ID
    setRefresh(prev => prev + 1);
  };

  // Effect to log when CostSheetNumber changes
  useEffect(() => {
    console.log("CostSheetNumber updated:", CostSheetNumber);
  }, [CostSheetNumber]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <CostContext.Provider
        value={{ CostSheetNumber, setCostSheetNumber, refresh, setRefresh }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* Project Info */}
          <Box sx={{ flex: 1 }}>
            <Card elevation={3}>
              <CardHeader
                title="Step 1: Project Information"
                sx={{ backgroundColor: "#1976d2", color: "#fff" }}
              />
              <CardContent>
                <CostEstiPrimaryData setCurrentCostSheetID={handleCostSheetIDChange} />
              </CardContent>
            </Card>
          </Box>

          <Divider orientation="vertical" flexItem />

          {/* Cost Breakdown */}
          <Box sx={{ flex: 1 }}>
            <Card elevation={3}>
              <CardHeader
                title="Step 2: Add Cost Breakdown"
                sx={{ backgroundColor: "#2e7d32", color: "#fff" }}
              />
              <CardContent>
                <CostBreakdownData 
                  currentCostSheetID={CostSheetNumber} 
                  onAddBreakdown={handleBreakdownAdded} 
                />
              </CardContent>
            </Card>
          </Box>

          <Divider orientation="vertical" flexItem />

          {/* Operation Sheet */}
          <Box sx={{ flex: 2 }}>
            <Card elevation={3}>
              <CardHeader
                title="Step 3: Operation Sheet Overview"
                sx={{ backgroundColor: "#9c27b0", color: "#fff" }}
              />
              <CardContent>
                <OperationSheet setEditingItem={setEditingItem} />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </CostContext.Provider>
    </Container>
  );
};

export default CreateCostEstimation;
