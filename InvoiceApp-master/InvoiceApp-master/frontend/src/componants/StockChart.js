import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FormControl, InputLabel, MenuItem, Select, Typography, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import './css/StocChart.css';

const StockChart = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Fabric"); // Default Fabric
  const [chartData, setChartData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [yAxisInterval, setYAxisInterval] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch material categories (excluding Fabric)
  useEffect(() => {
    axios.get("http://localhost:8070/api/stock/categories")
      .then(res => setCategories(res.data))
      .catch(() => setError("Error fetching categories"));
  }, []);

  // Fetch stock & usage data when category changes
  useEffect(() => {
    if (!selectedCategory) return;
    setLoading(true);
    setError("");

    axios.get(`http://localhost:8070/api/stock/category/${selectedCategory}`)
      .then(res => {
        setChartData(res.data.chartData);
        setTotalQuantity(res.data.totalQuantity);
        setYAxisInterval(res.data.yAxisInterval);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching stock data");
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <div className="stock-chart-container">
    
      <div className="title-dropdown-container">
        <Typography variant="h5" className="stock-chart-title">
          {selectedCategory ? `Stock & Usage for ${selectedCategory}` : "Select a Category"}
        </Typography>

        {/* Category Dropdown  get data from datbase */}
        <FormControl className="category-dropdown">
          <InputLabel shrink={selectedCategory !== ""}>Select Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat, index) => (
              <MenuItem key={index} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

  
      {error && <Alert severity="error" className="error-alert">{error}</Alert>}

   
      {loading && <CircularProgress className="loading-spinner" />}

      {/* Line Chart */}
      {!loading && chartData.length > 0 && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}> 
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis tickCount={5} domain={[0, totalQuantity]} interval={yAxisInterval} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="stockUsed" stroke="#f44336" name="Stock Used" />
              <Line type="monotone" dataKey="stockAdded" stroke="#4caf50" name="Stock Added" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StockChart;
