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
      <TopicBar text="Set Targets" userName="Adithya Hulangamuwa" />
      <div className="px-5 setTargetContainer">
        <div className="d-flex row bg-light justify-content-between p-5 rounded shadow w-100 set-target-wrapper">
          <TargetContex.Provider value={{ refresh, setRefresh }}>
            <SetTargetForm />
            <TargetTable />
          </TargetContex.Provider>
        </div>
      </div>
      <div className="displaylineTargetContainer py-5">
        <div className="d-flex justify-content-between p-5 rounded shadow displaylinetarget">
          <button type="button" className="btn btn-md btn-primary">
            <ArrowOutwardOutlinedIcon />
            Set Target
          </button>
          <div className="d-flex align-items-center gap-3">
            <span className="align-middle fs-3 fw-semibold">Line Target: </span>
            <span>125pcs/Day</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="align-middle fs-3 fw-semibold">
              Estimamet Delivary:
            </span>
            <span>5 Days 5th May 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};
