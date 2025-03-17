import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { InvoicePage } from "./InvoicePage";
import { QuotePage } from "./QuotePage";
import { SetTargets } from "./target/SetTargets";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import logo from "../asserts/img/logo.png";

export const Dashboard = () => {
  return (
    <Router>
      <div className="d-flex dashboard">
        <div className="sidebar d-flex flex-column vh-100 p-4 gap-5">
          <img className="w-5" src={logo}></img>

          <ul className="sidebar-list pl-0">
            <span className="fw-semibold">Pages</span>
            <li className="d-flex gap-2 my-3 bg-light bg-opacity-25 p-2 rounded">
              <DashboardOutlinedIcon sx={{ fill: "#007EA4" }} />
              <Link to="/">Dashboard</Link>
            </li>
            <li className="d-flex gap-2 my-3 bg-light bg-opacity-10 p-2 rounded">
              <DocumentScannerIcon sx={{ fill: "#007EA4" }} />
              <Link to="/invoice">Invoice</Link>
            </li>
            <li className="d-flex gap-2 my-3 bg-light bg-opacity-10 p-2 rounded">
              <PriceCheckIcon sx={{ fill: "#007EA4" }} />
              <Link to="quote">Quotation</Link>
            </li>
            <span className="fw-semibold">Targets</span>
            <li className="d-flex gap-2 my-3 bg-light bg-opacity-10 p-2 rounded">
              <PriceCheckIcon sx={{ fill: "#007EA4" }} />
              <Link to="set-targets">Set Targets</Link>
            </li>
          </ul>
        </div>
        <div className="m-3 pl-5 content-section">
          <Routes>
            <Route path="/invoice" element={<InvoicePage />} />
            <Route path="/quote" element={<QuotePage />} />
            <Route path="/set-targets" element={<SetTargets />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
