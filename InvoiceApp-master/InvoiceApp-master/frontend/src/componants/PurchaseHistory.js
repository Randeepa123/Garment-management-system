import React, { useState, useEffect, useCallback } from "react";
import "./css/PurchaseHistory.css";
import { FaCalendarAlt } from "react-icons/fa";

const PurchaseHistory = () => {
  const [stocks, setStocks] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch recent stocks with optional date filter
  const fetchRecentStocks = useCallback(async () => {
    try {
      let url = "http://localhost:8070/api/stock/recent";
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error("Error fetching recent stocks:", error);
      alert("Error fetching recent stocks. Please try again.");
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchRecentStocks();
  }, [fetchRecentStocks]);

  // Remove stock item
  const removeStockItem = async (stockId, itemName, category, quantity) => {
    if (!window.confirm("Are you sure you want to remove this item?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8070/api/stock/remove/${stockId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemName, category, quantity }),
      });

      if (!response.ok) {
        throw new Error(`Error removing stock item! Status: ${response.status}`);
      }

      alert("Stock item removed successfully!");
      fetchRecentStocks();// Refresh the stock listn 
      
    } catch (error) {
      console.error("Error removing stock item:", error);
      alert("Failed to remove stock item. Please try again.");
    }
  };

  return (
    <div className="purchase-history-container">
      <h2 className="section-title">Stock Purchase History</h2>
      
      <div className="filter-container">
        <div className="date-filter">
          <FaCalendarAlt className="icon" />
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="date-filter">
          <FaCalendarAlt className="icon" />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        
      </div>

      <div className="purchase-list">
        {stocks.map((stock) => (
          <div className="purchase-card" key={stock._id}>
            <p><strong>Category:</strong> {stock.category}</p>
            <p><strong>Item Name:</strong> {stock.itemName}</p>
            <p><strong>Quantity:</strong> {stock.quantity}</p>
            <p><strong>Price:</strong> {stock.price}</p>
            <p><strong>Supplier:</strong> {stock.supplier}</p>
            
            <div className="date-remove-container">
              <p><strong>Date Added:</strong> {new Date(stock.dateAdded).toLocaleDateString()}</p>
              <button className="remove-button" onClick={() => removeStockItem(stock._id, stock.itemName, stock.category, stock.quantity)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
