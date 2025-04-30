import React from "react";
import { useNavigate } from "react-router-dom";
import PurchaseHistory from "./PurchaseHistory";
import StockStatus from "./StockStatus";
import StockChart from "./StockChart";
import { TopicBar } from "./topicBar";
import StockReport from "./StockReport"; // <-- Import here
import "./css/Mainpage.css";

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div className="main-container">
            <div className="side-menu">
                {/* Your side menu */}
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
                        Retrieve stock
                    </button>
                    <button
                        className="chat-dashboard"
                        onClick={() => navigate("/stock-prediction")}
                    >
                        Stock Prediction
                    </button>
                    <StockReport />
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
