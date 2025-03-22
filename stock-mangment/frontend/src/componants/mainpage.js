import React from "react";
import { useNavigate } from "react-router-dom";
import PurchaseHistory from "./PurchaseHistory";
import StockStatus from "./StockStatus";
import StockChart from "./StockChart";
import "./Mainpage.css";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
     
      <div className="side-menu">
     
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="button-grid">
            <button className="dashboard-button" onClick={() => navigate("/add-stock")}>
              Add Stock
            </button>
            <button className="dashboard-button" onClick={() => navigate("/use-material")}>
              Use Material
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-container">
        
          <div className="dashboard-section stock-chart-section">
            <StockChart /> 
          </div>

         
          <div className="dashboard-section purchase-history-section">
            <PurchaseHistory /> 
          </div>

          {/* Stock Status Section */}
          <div className="dashboard-section stock-status-section">
            <StockStatus /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;