import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { SetTargetForm } from "../../componants/target/SetTargetForm";
import { TargetTable } from "../../componants/target/TargetTable";
import { TargetContex } from "../../contex/TargetContex";

import { TopicBar } from "../../componants/TopicBar";

import { LineTargetEstimation } from "../../componants/target/LineTargetEstimation";

export const SetTargets = () => {
  const [refresh, setRefresh] = useState(0);
  const { sheetNo } = useParams();

  return (
    <div>
      <TopicBar text="Set Targets" userName="Adithya Hulangamuwa" />
      <div className="px-5 setTargetContainer">
        <div className="d-flex row bg-light justify-content-between p-5 rounded shadow w-100 set-target-wrapper">
          <TargetContex.Provider value={{ refresh, setRefresh }}>
            <SetTargetForm sheetNum={sheetNo} />
            <TargetTable sheetNum={sheetNo} />
          </TargetContex.Provider>
        </div>
      </div>
      <div className="displaylineTargetContainer py-5">
        <LineTargetEstimation sheetNum={sheetNo} />
      </div>
    </div>
  );
};
