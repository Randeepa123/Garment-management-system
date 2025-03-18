import React from "react";
import CostEstiPrimaryData from "../ChildComponent/CostEstiPrimaryData";
import CostBreakdownData from "../ChildComponent/CostBreakdownData";
import CostEstimationSheet from "../ChildComponent/CostEstimationSheet";
import { Divider, Box } from "@mui/material";

export const CreateCostEstimation = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CostEstiPrimaryData />

      <Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            bgcolor: "#b2b8b8",
            width: "2px",
            height: "100%",
            marginLeft:"2px",
            marginTop: "20px",
            marginRight:"10px"
          }}
        />
      </Box>
      <CostBreakdownData />

      <Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            bgcolor: "#b2b8b8",
            width: "2px",
            height: "100%",
            marginLeft: 2,
            marginTop: "20px",
          }}
        />
      </Box>

      <CostEstimationSheet />
    </Box>
  );
};

export default CreateCostEstimation;
