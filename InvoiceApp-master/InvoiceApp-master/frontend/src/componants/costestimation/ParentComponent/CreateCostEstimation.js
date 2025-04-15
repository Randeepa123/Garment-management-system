import React, { useEffect, useState } from "react";
import CostEstiPrimaryData from "../ChildComponent/CostEstiPrimaryData";
import CostBreakdownData from "../ChildComponent/CostBreakdownData";
import OperationSheet from "../ChildComponent/OperationSheet";
import { Divider, Box } from "@mui/material";
//import { CostContext } from "../../../contex/CostContext";


export const CreateCostEstimation = () => {

  //const [Cost]
  //const [refresh, setRefresh] = useState("");
  const [currentCostSheetID, setCurrentCostSheetID] = useState(null);
  const [selectedCostSheet, setSelectedCostSheet] = useState(null);

  const handleAddBreakdown = (newBreakdowns) => {
    if (!selectedCostSheet) return;

    const updatedSheet = {
      ...selectedCostSheet,
      costBreakdown: [...selectedCostSheet.costBreakdown, ...newBreakdowns],
    };

    setSelectedCostSheet(updatedSheet);
   
  };

  return (
    <Box sx={{ display: "flex", p: 2, gap: 2 }}>
      <Box sx={{ flex: 1 }}>
    

        <CostEstiPrimaryData 
          setCurrentCostSheetID={setCurrentCostSheetID}
          />
     
          
       
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box sx={{ flex: 1 }}>
      
        <CostBreakdownData 
          currentCostSheetID={currentCostSheetID}
          onAddBreakdown={handleAddBreakdown} 
        />
         
      </Box>
    

      <Divider orientation="vertical" flexItem />

      <Box sx={{ flex: 2 }}>
        <OperationSheet 
          selectedCostSheet={selectedCostSheet}
          allowEdit={true}
          showSubmit={true}
        />
      </Box>
    </Box>
  );
  };

export default CreateCostEstimation;
