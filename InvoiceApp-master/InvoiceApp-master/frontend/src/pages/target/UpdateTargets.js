import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TopicBar } from "../../componants/TopicBar";

import { UpdateTargetForm } from "../../componants/target/UpdateTargetForm";
import { UpdateTargetTable } from "../../componants/target/UpdateTargetTable";
import { UpdateTargetContex } from "../../contex/UpdateTargetContex";
import { UpdateTargetPie } from "../../componants/target/UpdateTargetPie";
import { TargetAchiversList } from "../../componants/target/TargetAchiversList";

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
          <div className="col-3 target-card rounded-4 mx-2 p-4">
            <TargetAchiversList sheetNum={sheetNo} />
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
