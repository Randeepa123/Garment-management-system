import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { InvoicePage } from "./InvoicePage";
import { QuotePage } from "./QuotePage";
import { SetTargets } from "./target/SetTargets";
import Order_Mainpage from "./Order_Management/Order_Mainpage";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import logo from "../asserts/img/logo.png";
import { UpdateTargets } from "./target/UpdateTargets";
import { TargetDashboard } from "./target/TargetDashboard";
import AddOrder from "./Order_Management/AddOrder";
import UpdateOrder from "./Order_Management/UpdateOrder";
import { Employee } from "./target/Employee";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { DashboardContent } from "../componants/DashboardContent";

export const Dashboard = () => {
  return (
    <div className="d-flex dashboard">
      <div className="d-flex flex-column p-4 gap-5 sidebar vh-100">
        <img className="w-5" src={logo} alt="Logo" />

        <ul className="pl-0 sidebar-list">
          <span className="fw-semibold">Pages</span>
          <li className="d-flex bg-light bg-opacity-25 p-2 rounded gap-2 my-3">
            <DashboardOutlinedIcon sx={{ fill: "#007EA4" }} />
            <Link to="/dc">Dashboard</Link>
          </li>
          <li className="d-flex bg-light bg-opacity-10 p-2 rounded gap-2 my-3">
            <DocumentScannerIcon sx={{ fill: "#007EA4" }} />
            <Link to="/invoice">Invoice</Link>
          </li>
          <li className="d-flex bg-light bg-opacity-10 p-2 rounded gap-2 my-3">
            <PriceCheckIcon sx={{ fill: "#007EA4" }} />
            <Link to="/quote">Quotations</Link>
          </li>
          <span className="fw-semibold">Targets</span>
          <li className="d-flex bg-light bg-opacity-10 p-2 rounded gap-2 my-3">
            <PriceCheckIcon sx={{ fill: "#007EA4" }} />
            <Link to="/targets">Target Sheet</Link>
          </li>
          <span className="fw-semibold">Orders</span>
          <li className="d-flex bg-light bg-opacity-10 p-2 rounded gap-2 my-3">
            <PriceCheckIcon sx={{ fill: "#007EA4" }} />
            <Link to="/orders">Orders</Link>
          </li>
          <span className="fw-semibold">Employee</span>
          <li className="d-flex bg-light bg-opacity-10 p-2 rounded gap-2 my-3">
            <PriceCheckIcon sx={{ fill: "#007EA4" }} />
            <Link to="/employees">Employees</Link>
          </li>

          <span className="fw-semibold">Accounting</span>
          <li className="d-flex bg-light bg-opacity-10 p-2 rounded gap-2 my-3">
            <AccountBalanceIcon sx={{ fill: "#007EA4" }} />
            <a href="http://localhost:3001/analytics">Accounting</a>
          </li>
        </ul>
      </div>
      <div className="m-3 content-section pl-5">
        <Routes>
          <Route path="/" element={<TargetDashboard />} />
          <Route path="/dc" element={<DashboardContent />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/targets" element={<TargetDashboard />} />
          <Route path="/set-targets/:sheetNo" element={<SetTargets />} />
          <Route path="/update-targets/:sheetNo" element={<UpdateTargets />} />
          <Route path="/orders" element={<Order_Mainpage />} />
          <Route path="/addOrder" element={<AddOrder />} />
          <Route path="/updateorder" element={<UpdateOrder />} />
          <Route path="/employees" element={<Employee />} />
        </Routes>
      </div>
    </div>
  );
};
