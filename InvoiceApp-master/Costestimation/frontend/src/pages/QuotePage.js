import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CostEstimationHistory from "../componants/costestimation/CostEstimationHistory";
import CreateCostEstimation from "../componants/costestimation/CreateCostEstimation";

export const QuotePage = () => {
  const [activeTab, setActiveTab] = useState("history"); 

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => setActiveTab("history")}
          sx={{ minWidth: "200px" }}
        >
          View Cost Estimations
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveTab("create")}
          sx={{ minWidth: "200px" }}
        >
          Create New Cost Estimation
        </Button>
      </Box>
      <Box>
       {/*this statements acts like if else ?  and :*/}
        {activeTab === "history" ? 
        (
          <CostEstimationHistory />
        ) : (
          <CreateCostEstimation />
        )}
      </Box>



    </Box>
  );
};

export default QuotePage;
