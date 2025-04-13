import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { InvoicePage } from "./InvoicePage";
import { QuotePage } from "./QuotePage";
import { SetTargets } from "./target/SetTargets";
import  Order_Mainpage  from "./Order_Management/Order_Mainpage";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import logo from "../asserts/img/logo.png";
import { UpdateTargets } from "./target/UpdateTargets";

import { TargetDashboard } from "./target/TargetDashboard";


export const Dashboard = () => {
  return (
    <Router>
      <div className="d-flex dashboard">
        <div className="d-flex flex-column p-4 gap-5 sidebar vh-100">
          <img className="w-5" src={logo}></img>

          <ul className="pl-0 sidebar-list">
            <span className="fw-semibold">Pages</span>
            <li className="d-flex bg-light bg-opacity-25 p-2 rounded gap-2 my-3">
              <DashboardOutlinedIcon sx={{ fill: "#007EA4" }} />
              <Link to="/">Dashboard</Link>
            </li>
            <li className="d-flex bg-light bg-opacity-10 p-2 rounded gap-2 my-3">
              <DocumentScannerIcon sx={{ fill: "#007EA4" }} />
              <Link to="/invoice">Invoice</Link>
            </li>
            <li className="d-flex bg-light bg-opacity-10 p-2 rounded gap-2 my-3">
              <PriceCheckIcon sx={{ fill: "#007EA4" }} />
              <Link to="quote">Quotations</Link>
            </li>
            <span className="fw-semibold">Targets</span>
            <li className="d-flex bg-light bg-opacity-10 p-2 rounded gap-2 my-3">
              <PriceCheckIcon sx={{ fill: "#007EA4" }} />
              <Link to="set-targets">Set Targets</Link>
            </li>
            <li className="d-flex bg-light bg-opacity-10 p-2 rounded gap-2 my-3">
              <PriceCheckIcon sx={{ fill: "#007EA4" }} />
              <Link to="update-targets">Update Targets</Link>
            </li>

            <li className="d-flex gap-2 my-3 bg-light bg-opacity-10 p-2 rounded">
              <PriceCheckIcon sx={{ fill: "#007EA4" }} />
              <Link to="targets">Target Dashboard</Link>

            </li>
          </ul>
        </div>
        <div className="m-3 content-section pl-5">
          <Routes>
            <Route path="/invoice" element={<InvoicePage />} />
            <Route path="/quote" element={<QuotePage />} />

            <Route path="/set-targets/:sheetNo" element={<SetTargets />} />
            <Route path="/targets" element={<TargetDashboard />} />
            <Route
              path="/update-targets/:sheetNo"
              element={<UpdateTargets />}
            />

          </Routes>
        </div>
      </div>
    </Router>
  );
};
