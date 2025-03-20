import React, { useEffect, useState } from "react";
import CostEstiPrimaryData from "../ChildComponent/CostEstiPrimaryData";
import CostBreakdownData from "../ChildComponent/CostBreakdownData";
import CostEstimationSheet from "../ChildComponent/CostEstimationSheet";
import { Divider, Box, Button } from "@mui/material";
import Axios from "axios";

export const CreateCostEstimation = () => {
  const [costSheets, setCostSheets] = useState([]);

  useEffect(() => {
    getAllCostEstimationSheets();
  }, []);

  const getAllCostEstimationSheets = () => {
    Axios.get('http://localhost:8070/api/costEstimations')
      .then((response) => {
        setCostSheets(response.data.response || [])
        
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  };


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
            marginLeft: "2px",
            marginTop: "20px",
            marginRight: "10px",
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

      <CostEstimationSheet rows={costSheets} allowEdit={true} showSubmit={true} isNewSheet={true}/>

    
    </Box>
  );
};

export default CreateCostEstimation;
