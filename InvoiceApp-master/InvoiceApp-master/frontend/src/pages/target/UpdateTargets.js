import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TopicBar } from "../../componants/TopicBar";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Box from "@mui/material/Box";
import { UpdateTargetForm } from "../../componants/target/UpdateTargetForm";
import { UpdateTargetTable } from "../../componants/target/UpdateTargetTable";
import { UpdateTargetContex } from "../../contex/UpdateTargetContex";
import { UpdateTargetPie } from "../../componants/target/UpdateTargetPie";
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

export const UpdateTargets = () => {
  const [refresh, setRefresh] = useState(0);
  const [totalIots, settotalIots] = useState();
  const { sheetNo } = useParams();

  return (
    <div>
      <UpdateTargetContex.Provider
        value={{ refresh, setRefresh, totalIots, settotalIots }}
      >
        <TopicBar text="Update Targets" />

        <UpdateTargetTable sheetNum={sheetNo} />
        <div className="row px-5">
          <div className="col-3 target-card rounded-4 mx-2 p-3">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column gap-3">
                <span className="fs-3">Daily Target</span>
                <span className="fs-3">50/250</span>
              </div>
              <div>
                <CircleIconBox
                  icon={<Inventory2OutlinedIcon sx={{ color: "white" }} />}
                />
              </div>
            </div>
            <div className="d-flex mt-3 align-items-senter gap-3">
              <div className="d-flex gap-1 rounded-pill bg-body-secondary  p-2">
                <CircleIconBox
                  icon={
                    <ArrowUpwardOutlinedIcon
                      sx={{ color: "white", width: 12, height: 12 }}
                      pwidth={20}
                    />
                  }
                  pwidth={20}
                />
                <span>18.89%</span>
              </div>
              <span className="align-self-center">From last month</span>
            </div>
          </div>
          <div className="col target-card rounded-4 mx-2  p-3">
            <span className="fs-4  text-center">Target Progress</span>
            <UpdateTargetPie sheetNum={sheetNo} />
          </div>
          <div className="col target-card rounded-4 mx-2 ">
            <UpdateTargetForm sheetNum={sheetNo} />
          </div>
        </div>
      </UpdateTargetContex.Provider>
    </div>
  );
};
