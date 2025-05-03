import React, { useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import axios from "axios";

const AddIncome = () => {
  const [form, setForm] = useState({
    CustomerID: "",
    OrderID: "",
    RequestedDate: "",
    Quantity: "",
    Amount_LKR: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
    setSuccess("");
  };

  const validate = () => {
    if (
      !form.CustomerID ||
      !form.OrderID ||
      !form.RequestedDate ||
      !form.Quantity ||
      !form.Amount_LKR
    ) {
      setError("All fields are required.");
      return false;
    }
    if (parseInt(form.CustomerID) <= 0 || parseInt(form.OrderID) <= 0) {
      setError("IDs must be positive numbers.");
      return false;
    }
    if (parseInt(form.Quantity) <= 0) {
      setError("Quantity must be a positive number.");
      return false;
    }
    if (parseFloat(form.Amount_LKR) <= 0) {
      setError("Amount must be a positive number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!validate()) return;
    try {
      console.log(form);
      await axios.post("http://localhost:8080/refund/add", form);
      setSuccess("Income has been added successfully!");
      setTimeout(() => navigate("/viewrefund"), 1200);
    } catch (err) {
      setError(
        "Something went wrong! Please check your backend and try again."
      );
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          background: "#f7f7fa",
          minHeight: "100vh",
          padding: "40px 0",
          marginLeft: 250,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 24px #e5e7eb",
            padding: 40,
            minWidth: 340,
            maxWidth: 400,
            width: "100%",
          }}
        >
          <h2
            style={{
              color: "#192841",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            Add Income
          </h2>
          {error && (
            <div
              style={{
                color: "#d72660",
                background: "#fff5f5",
                border: "1px solid #ffcdd2",
                borderRadius: 8,
                padding: 10,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              style={{
                color: "#10b981",
                background: "#e6fff5",
                border: "1px solid #b2f5ea",
                borderRadius: 8,
                padding: 10,
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              {success}
            </div>
          )}

          <label
            style={{
              color: "#192841",
              fontWeight: 500,
              marginBottom: 6,
              display: "block",
            }}
          >
            Customer ID
          </label>
          <input
            type="number"
            name="CustomerID"
            value={form.CustomerID}
            onChange={handleChange}
            min="1"
            style={inputStyle}
            placeholder="Enter Customer ID"
          />

          <label
            style={{
              color: "#192841",
              fontWeight: 500,
              marginBottom: 6,
              marginTop: 16,
              display: "block",
            }}
          >
            Order ID
          </label>
          <input
            type="number"
            name="OrderID"
            value={form.OrderID}
            onChange={handleChange}
            min="1"
            style={inputStyle}
            placeholder="Enter Order ID"
          />

          <label
            style={{
              color: "#192841",
              fontWeight: 500,
              marginBottom: 6,
              marginTop: 16,
              display: "block",
            }}
          >
            Requested Date
          </label>
          <input
            type="date"
            name="RequestedDate"
            value={form.RequestedDate}
            onChange={handleChange}
            style={inputStyle}
          />

          <label
            style={{
              color: "#192841",
              fontWeight: 500,
              marginBottom: 6,
              marginTop: 16,
              display: "block",
            }}
          >
            Quantity
          </label>
          <input
            type="number"
            name="Quantity"
            value={form.Quantity}
            onChange={handleChange}
            min="1"
            style={inputStyle}
            placeholder="Enter Quantity"
          />

          <label
            style={{
              color: "#192841",
              fontWeight: 500,
              marginBottom: 6,
              marginTop: 16,
              display: "block",
            }}
          >
            Amount (LKR)
          </label>
          <input
            type="number"
            name="Amount_LKR"
            value={form.Amount_LKR}
            onChange={handleChange}
            min="1"
            style={inputStyle}
            placeholder="Enter Amount"
          />

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: 28,
              background: "#192841",
              color: "#fff",
              fontWeight: 600,
              fontSize: 16,
              border: "none",
              borderRadius: 8,
              padding: "12px 0",
              cursor: "pointer",
              boxShadow: "0 2px 8px #19284122",
              transition: "background 0.2s",
            }}
          >
            Add Income
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: 8,
  border: "1px solid #e0e0e0",
  fontSize: 15,
  marginBottom: 2,
};

export default AddIncome;
