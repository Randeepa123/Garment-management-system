import React from "react";
import { TopicBar } from "../../componants/TopicBar";
import { LineChart } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import { AllTargetsTable } from "../../componants/target/AllTargetsTable";
import { OrderProgressTable } from "../../componants/target/OrderProgressTable";
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

export const TargetDashboard = () => {
  return (
    <div>
      <TopicBar text="Targets" />
      <div className="target-dasboard row">
        <div className="col-8">
          <div className="row px-2">
            <div className="col target-card rounded-4 mx-2 p-3">
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column gap-3">
                  <span className="fs-5">Today Attendance</span>
                  <span className="fs-3">20/25</span>
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
              <div className="col target-card rounded-4 mx-2 p-3">
                <div className="d-flex justify-content-between">
                  <div className="d-flex flex-column gap-3">
                    <span className="fs-5">Total Orders in Prosess</span>
                    <span className="fs-3">10</span>
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
            </div>
          </div>
          <AllTargetsTable />
        </div>
        <div className="col-4">
          <div className="col target-card rounded-4 my-2 p-3">
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={400}
              height={300}
            />
          </div>
          <div className="col target-card rounded-4  p-3">
            <OrderProgressTable />
          </div>
        </div>
      </div>
    </div>
  );
};
