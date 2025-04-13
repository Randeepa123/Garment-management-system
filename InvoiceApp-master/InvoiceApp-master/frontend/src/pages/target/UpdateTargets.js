import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { TopicBar } from "../../componants/TopicBar";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import { UpdateTargetForm } from "../../componants/target/UpdateTargetForm";
import { UpdateTargetTable } from "../../componants/target/UpdateTargetTable";
import { UpdateTargetContex } from "../../contex/UpdateTargetContex";
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
  const { sheetNo } = useParams();

  return (
    <div>
      <UpdateTargetContex.Provider value={{ refresh, setRefresh }}>
        <TopicBar text="Update Targets" />
        <div className="d-flex justify-content-between top-button-row py-3 px-5">
          <div className="d-flex gap-3">
            <select
              className="form-select form-select-sm rounded"
              aria-label="Large select example"
            >
              <option value="0">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <select
              className="form-select form-select-sm rounded"
              aria-label="Large select example"
            >
              <option value="0">Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="d-flex gap-3">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <SearchOutlinedIcon />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <button type="button" className="btn btn-primary btn-md">
              <ArrowOutwardOutlinedIcon />
              Set Target
            </button>
          </div>
        </div>
        <UpdateTargetTable sheetNum={sheetNo} />
        <div className="row px-5">
          <div className="col-3 target-card rounded-4 mx-2 p-3">
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-column gap-3">
                <span className="fs-5">Daily Target</span>
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
          <div className="col target-card rounded-4 mx-2 p-3">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "series A" },
                    { id: 1, value: 15, label: "series B" },
                    { id: 2, value: 20, label: "series C" },
                  ],
                },
              ]}
              width={400}
              height={200}
            />
          </div>
          <div className="col target-card rounded-4 mx-2 ">
            <UpdateTargetForm sheetNum={sheetNo} />
          </div>
        </div>
      </UpdateTargetContex.Provider>
    </div>
  );
};
