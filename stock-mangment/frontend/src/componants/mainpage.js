import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PurchaseHistory from "./PurchaseHistory";
import StockStatus from "./StockStatus";
import StockChart from "./StockChart";
import "./css/Mainpage.css"; // Import the CSS file
import { TopicBar } from "./topicBar";


const MainPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="main-container">
     
      <div className="side-menu">
      
      </div>

      <div className="main-content">
      
        <div className="top-bar">
          <TopicBar />
        </div>
 
        <div className="button-container">
          <button
            className="dashboard-button"
            onClick={() => navigate("/add-stock")}
          >
            Add Stock
          </button>
          <button
            className="use-dashboard-button"
            onClick={() => navigate("/use-material")}
          >
            Use Material
          </button>
          <button className="chat-dashboard" onClick={() => navigate("")}>
            Chat Bot
          </button>
          <button className="dashboard-button" onClick={() => navigate("")}>
            Export Report
          </button>

         
          <div className="date-selection">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

       
        <div className="dashboard-container">
          <div className="dashboard-section stock-chart-section">
            <StockChart />
          </div>
          <div className="dashboard-section purchase-history-section">
            <PurchaseHistory />
          </div>
          <div className="dashboard-section stock-status-section">
            <StockStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
