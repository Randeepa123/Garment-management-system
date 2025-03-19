import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TopicBar } from "../../componants/TopicBar";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import { UpdateTargetForm } from "../../componants/target/UpdateTargetForm";
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
  const SheetNo = "TS001";
  const [targets, setTargets] = useState([]);

  const fetchTargets = async () => {
    try {
      console.log("Fetching Targets...");
      const response = await axios.get(
        `http://localhost:8070/target/getSheet?SheetNo=${SheetNo}`
      );
      setTargets(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchTargets();
  }, []);

  return (
    <div>
      <TopicBar text="Update Targets" userName="Adithya Hulangamuwa" />
      <div className="d-flex justify-content-between px-5 py-3 top-button-row">
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
          <button type="button" className="btn btn-md btn-primary">
            <ArrowOutwardOutlinedIcon />
            Set Target
          </button>
        </div>
      </div>
      <div className="table-striped p-4 target-update">
        <table className="table rounded">
          <thead>
            <tr>
              <th scope="col">Operation</th>
              <th scope="col">X</th>
              <th scope="col" className="noWrapping">
                Hour Target
              </th>
              <th scope="col">Operator</th>
              {[...Array(10)].map((_, i) => (
                <th key={i}>{`${8 + i}:15 - ${9 + i}:15`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {targets.map((target) => (
              <tr key={`${target.EmployeeId._id}-${target.Operation}`}>
                <td>{target.EmployeeId.name}</td>
                <td>18</td>
                <td>{target.Operation}</td>
                <td>{target.ITarget}</td>
                {[...Array(10)].map((_, i) => (
                  <td key={`${target.EmployeeId._id}-${i}`}>0</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="row px-5">
        <div className="col-3 p-3 rounded-4 mx-2 target-card">
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
          <div className="d-flex align-items-senter gap-3 mt-3">
            <div className="d-flex bg-body-secondary p-2 rounded-pill gap-1">
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
        <div className="col p-3 rounded-4 mx-2 target-card">
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
        <div className="col rounded-4 mx-2 target-card">
          <UpdateTargetForm />
        </div>
      </div>
    </div>
  );
};
