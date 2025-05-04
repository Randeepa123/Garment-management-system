import React, { useState, useEffect } from "react";
import "./css/StockStatus.css";

const StockStatus = () => {
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStockLevels();
  }, []);

  const fetchStockLevels = async () => {
    try {
      const response = await fetch("http://localhost:8070/api/stock");
      if (!response.ok) throw new Error("Failed to fetch stock levels");

      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching stock levels:", error);
      alert("Error fetching stock levels. Please try again later.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMaterials = materials.filter((material) =>
    material.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="stock-status-container">
      <div className="search-bar-container">
        <h2 className="h2_ishan">Stock status</h2>
        <input
          type="text"
          placeholder="Search by item name"
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <div className="table-scroll-container">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredMaterials.map((material) => (
              <tr key={material._id}>
                <td>{material.category}</td>
                <td>{material.itemName}</td>
                <td>{material.quantity}</td>
                <td>
                  <span
                    className={
                      material.status === "Low Stock"
                        ? "status-badge low-stock"
                        : "status-badge in-stock"
                    }
                  >
                    {material.status.toLowerCase() === "low stock"
                      ? "low stock"
                      : "in stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockStatus;
