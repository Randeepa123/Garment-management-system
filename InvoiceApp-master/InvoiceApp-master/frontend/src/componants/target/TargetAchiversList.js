import React, { useEffect, useState, useContext } from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Box from "@mui/material/Box";
import { UpdateTargetContex } from "../../contex/UpdateTargetContex";
import axios from "axios";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";

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

export const TargetAchiversList = ({ sheetNum }) => {
  const [targets, setTargets] = useState([]);
  const [achivers, setAchivers] = useState([]);
  const { refresh } = useContext(UpdateTargetContex);

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8070/target/getSheet?SheetNo=${sheetNum}`
        );
        console.log("From Achivers", res.data);
        setTargets(res.data || []);
      } catch (error) {
        console.error("Error fetching targets:", error);
      }
    };

    fetchTargets();
  }, [refresh]);

  useEffect(() => {
    const tempAchievers = [];

    targets.forEach((target) => {
      let flag = false;
      let count = 0;

      for (const iout of target.IOuts) {
        if (iout > target.ITarget || iout == null) {
          flag = true;
          if (iout != null) count++;
        } else {
          flag = false;
          break;
        }
      }

      if (flag) {
        tempAchievers.push({
          name: target.EmployeeId.name,
          count: count,
          id: target.EmployeeId._id,
        });
      }
    });

    setAchivers(tempAchievers);
  }, [targets]);
  useEffect(() => {
    console.log(achivers);
  }, [achivers]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column gap-3">
          <span className="fs-3">Target Achivers List</span>
        </div>
        <div>
          <CircleIconBox
            icon={<Inventory2OutlinedIcon sx={{ color: "white" }} />}
          />
        </div>
      </div>
      <div className="d-flex flex-column mt-3 align-items-senter gap-3">
        <ul className="list-group w-100">
          {achivers && achivers.length > 0 ? (
            achivers.map((achiver) => (
              <li
                key={achiver.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {achiver.name}
                <span className="badge text-bg-primary rounded-pill">
                  {achiver.count}
                </span>
              </li>
            ))
          ) : (
            <p>No achievers</p>
          )}
        </ul>
        <button type="button" class="w-100 btn btn-primary btn-md">
          <ArrowOutwardOutlinedIcon />
          Refer Manager
        </button>
      </div>
    </div>
  );
};
