import React, { useState, useEffect } from "react";
import "./UseMaterial.css"; // Import the CSS file

const UseMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [usageRecords, setUsageRecords] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    itemName: "",
    quantity: "",
    description: "",
  });

  useEffect(() => {
    fetchMaterials();
    fetchUsageRecords();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://localhost:8070/api/materials");
      if (!response.ok) throw new Error("Failed to fetch materials");

      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
      alert("Error fetching materials.");
    }
  };

  const fetchUsageRecords = async () => {
    try {
      const response = await fetch("http://localhost:8070/api/materials/usage");
      if (!response.ok) throw new Error("Failed to fetch usage records");

      const data = await response.json();
      setUsageRecords(data);
    } catch (error) {
      console.error("Error fetching usage records:", error);
      alert("Error fetching usage records.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 20) {
      alert("Description cannot exceed 20 characters.");
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8070/api/materials/use", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          quantityUsed: formData.quantity, // Send quantityUsed instead of quantity
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Material used successfully!");
        setFormData({ category: "", itemName: "", quantity: "", description: "" });
        fetchMaterials();
        fetchUsageRecords();
      } else {
        alert(data.message || "Failed to use material.");
      }
    } catch (error) {
      console.error("Error using material:", error);
      alert("An error occurred.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8070/api/materials/usage/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Usage record deleted successfully.");
        fetchUsageRecords();
      } else {
        alert("Failed to delete usage record.");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="use-material-container">
      <h2>Use Material</h2>
      <form onSubmit={handleSubmit} className="use-material-form">
        {/* Category Dropdown */}
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {Array.from(new Set(materials.map((mat) => mat.category))).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Item Name Dropdown */}
        <div className="form-group">
          <label>Item Name:</label>
          <select
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
            disabled={!formData.category}
          >
            <option value="">Select Item</option>
            {materials
              .filter((mat) => mat.category === formData.category)
              .map((mat) => (
                <option key={mat.itemName} value={mat.itemName}>
                  {mat.itemName}
                </option>
              ))}
          </select>
        </div>

        {/* Quantity Input */}
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={20} // Set character limit to 20
            placeholder="Enter description (max 20 characters)"
          />
        </div>

        <button
          type="submit"
          disabled={!formData.category || !formData.itemName || !formData.quantity}
          className="submit-button"
        >
          Use Material
        </button>
      </form>

      <h3>Material Usage History</h3>
      <ul className="usage-history-list">
        {usageRecords.map((usage) => (
          <li key={usage._id} className="usage-record">
            <span className="record-field">
              <span className="record-label">Category:</span>
              <span className="record-value">{usage.category}</span>
            </span>
            <span className="record-field">
              <span className="record-label">Item Name:</span>
              <span className="record-value">{usage.itemName}</span>
            </span>
            <span className="record-field">
              <span className="record-label">Quantity:</span>
              <span className="record-value">{usage.quantityUsed}</span>
            </span>
            <span className="record-field">
              <span className="record-label">Description:</span>
              <span className="record-value">{usage.description}</span>
            </span>
            <button
              onClick={() => handleDelete(usage._id)}
              className="delete-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UseMaterial;