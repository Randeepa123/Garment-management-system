import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import CostEstimationHistory from "./CostEstimationHistory";
import CostEstimationSheet from "../ChildComponent/CostEstimationSheet";

const CostEstimationManager = () => {
  const [selectedCostSheet, setSelectedCostSheet] = useState(null);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2, padding: 2 }}>
      <Grid item xs={4}>
        <CostEstimationHistory onSelectCostSheet={setSelectedCostSheet} />
      </Grid>
      <Grid item xs={8}>
        {selectedCostSheet ? (
          <CostEstimationSheet rows={[selectedCostSheet]} />
        ) : (
          <p>Select a cost estimation to view details</p>
        )}
      </Grid>
    </Box>
  );
};

export default CostEstimationManager;
