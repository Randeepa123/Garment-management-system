import React, { useState } from "react";
import axios from "axios";
import "./css/StockPrediction.css"; // Import the new CSS

const StockPredictionPage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setPredictionData(null);

      const response = await axios.post("http://localhost:8070/api/stock/predict", {
        startDate,
        endDate,
      });

      if (response.data?.success && response.data?.prediction) {
        setPredictionData(response.data.prediction);
      } else if (response.data?.message) {
        setError(response.data.message);
      } else {
        setError("No prediction data received from the backend.");
      }
    } catch (err) {
      console.error("Prediction Error:", err);
      setError("Failed to fetch prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-container">
      <h2 className="prediction-title"> Stock & Cost Prediction</h2>

      <div className="input-group">
        <div>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button onClick={handlePredict}>Predict</button>
      </div>

      {loading && <p className="loading-text">🔄 Generating prediction...</p>}
      {error && <p className="error-text">{error}</p>}

      {predictionData?.details?.length > 0 && (
        <div className="result-card">
          <h3>Predicted Material Requirements</h3>
          <table className="prediction-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price (LKR)</th>
              </tr>
            </thead>
            <tbody>
              {predictionData.details.map((item, index) => (
                <tr key={index}>
                  <td>{item.category}</td>
                  <td>{item.itemName}</td>
                  <td className="text-right">{item.requiredQuantity}</td>
                  <td className="text-right">{item.Price}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-right total-label">Total Estimated Budget:</td>
                <td className="text-right total-value">
                  {predictionData.totalBudget ? predictionData.totalBudget.toFixed(2) : "N/A"}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {predictionData && (!predictionData.details || predictionData.details.length === 0) && (
        <p className="no-data-text">No prediction details available.</p>
      )}
    </div>
  );
};

export default StockPredictionPage;
