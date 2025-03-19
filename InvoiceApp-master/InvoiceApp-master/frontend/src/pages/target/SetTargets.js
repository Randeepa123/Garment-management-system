import React, { useState } from "react";
import { SetTargetForm } from "../../componants/target/SetTargetForm";
import { TargetTable } from "../../componants/target/TargetTable";
import { TargetContex } from "../../contex/TargetContex";

import { TopicBar } from "../../componants/TopicBar";

import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";

export const SetTargets = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <TopicBar text="Set Targets" />
      <div className="setTargetContainer px-5">
        <div className="row set-target-wrapper d-flex w-100 justify-content-between p-5 bg-light rounded shadow ">
          <TargetContex.Provider value={{ refresh, setRefresh }}>
            <SetTargetForm />
            <TargetTable />
          </TargetContex.Provider>
        </div>
      </div>
      <div className="displaylineTargetContainer py-5">
        <div className="displaylinetarget p-5 d-flex justify-content-between rounded shadow">
          <button type="button" className="btn btn-primary btn-md">
            <ArrowOutwardOutlinedIcon />
            Set Target
          </button>
          <div className="d-flex align-items-center gap-3">
            <span className="fs-3 fw-semibold align-middle">Line Target: </span>
            <span>125pcs/Day</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="fs-3 fw-semibold align-middle">
              Estimamet Delivary:
            </span>
            <span>5 Days 5th May 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};
