import React, { useState, useEffect } from "react";
import { Box, Button, Divider } from "@mui/material";
import CostEstimationHistory from "../componants/costestimation/ParentComponent/CostEstimationHistory";
import CreateCostEstimation from "../componants/costestimation/ParentComponent/CreateCostEstimation";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Axios from "axios";

export const QuotePage = () => {


  const [activeTab, setActiveTab] = useState("history");
  const [expanded, setExpanded] = useState({ history: false, create: false });

  const handleClick = (tab) => {
    setActiveTab(tab);
    setExpanded((prev) => ({ ...prev, [tab]: !prev[tab] }));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "block", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          onClick={() => handleClick("history")}
          sx={{
            minWidth: "200px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            width: "1100px",
            height: "50px",
            fontSize: "15px",
          }}
        >
          <InsertDriveFileIcon sx={{ marginRight: "10px" }} />
          View Cost Estimations
          {expanded.history ? <ExpandLessIcon /> : <ArrowForwardIosIcon />}
        </Button>

        <Button
          variant="contained"
          onClick={() => handleClick("create")}
          sx={{
            minWidth: "200px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            width: "1100px",
            height: "50px",
            fontSize: "15px",
          }}
        >
          <ControlPointIcon sx={{ marginRight: "10px" }} />
          Create New Cost Estimation
          {expanded.create ? <ExpandLessIcon /> : <ArrowForwardIosIcon />}
        </Button>
      </Box>

      <Divider
        sx={{
          width: "100vw",
          lineHeight: "1.2px",
          bgcolor: "black",
          marginBottom: "5px",
        }}
      ></Divider>

      <Box sx={{ width: "300px" }}>
        {activeTab === "history" ? (
          <CostEstimationHistory />
        ) : (
          <CreateCostEstimation />
        )}
      </Box>
    </Box>
  );
};

export default QuotePage;
