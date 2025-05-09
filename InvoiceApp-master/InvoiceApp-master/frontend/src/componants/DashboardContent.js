import React from "react";
import { TopicBar } from "../componants/TopicBar";

import Box from "@mui/material/Box";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { AllTargetsTable } from "../componants/target/AllTargetsTable";
import { OrderProgressTable } from "../componants/target/OrderProgressTable";
import { OutAnalysisGraph } from "../componants/target/OutAnalysisGraph";
import { ProcessSchedule } from "../componants/target/ProcessSchedule";
function CircleIconBox({ icon, color = "#007ea4", pwidth = 40 }) {
  return (
    <Box
      sx={{
        backgroundColor: color,
        width: pwidth,
        height: pwidth,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
    </Box>
  );
}

export const DashboardContent = () => {
  return (
    <div>
      <TopicBar text="Targets" />
      <div className="target-dasboard row">
        <div className="col-12">
          <div className="row px-2">
            <AllTargetsTable />
            <OutAnalysisGraph />
          </div>
          <AllTargetsTable />
        </div>
      </div>
      <div className="schedule col target-card rounded-4 row m-2 p-3">
        <ProcessSchedule />
      </div>
    </div>
  );
};
