import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FinanceSideMenu from "./FinanceSideMenu";

const UpdateIncome = () => {
  const { id } = useParams();
  const [income, setIncome] = useState({
    RefundID: "",
    CustomerID: "",
    OrderID: "",
    RequestedDate: "",
    Quantity: "",
    Amount_LKR: "",
  });
  const [message, setMessage] = useState("");
  const [requiredError, setRequiredError] = useState("");
  const [idError, setIdError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadIncome();
  }, []);

  const loadIncome = async () => {
    const result = await axios.get(`http://localhost:8080/refund/post/${id}`);
    setIncome(result.data.refund);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // ID fields validation
    if (["RefundID", "CustomerID", "OrderID"].includes(name)) {
      if (value && parseInt(value) <= 0) {
        setIdError("All IDs must be positive numbers");
      } else {
        setIdError("");
      }
    }
    // Quantity validation
    if (name === "Quantity") {
      if (value && parseInt(value) <= 0) {
        setQuantityError("Quantity must be a positive number");
      } else {
        setQuantityError("");
      }
    }
    // Amount validation
    if (name === "Amount_LKR") {
      if (value && parseFloat(value) <= 0) {
        setAmountError("Amount must be a positive number");
      } else {
        setAmountError("");
      }
    }
    setIncome({ ...income, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Required fields validation
    if (
      !income.RefundID ||
      !income.CustomerID ||
      !income.OrderID ||
      !income.RequestedDate ||
      !income.Quantity ||
      !income.Amount_LKR
    ) {
      setRequiredError("All fields are required");
      return;
    }
    setRequiredError("");
    // Positive number validation
    if (
      [income.RefundID, income.CustomerID, income.OrderID].some(
        (id) => parseInt(id) <= 0
      )
    ) {
      setIdError("All IDs must be positive numbers");
      return;
    }
    setIdError("");
    if (parseInt(income.Quantity) <= 0) {
      setQuantityError("Quantity must be a positive number");
      return;
    }
    setQuantityError("");
    if (parseFloat(income.Amount_LKR) <= 0) {
      setAmountError("Amount must be a positive number");
      return;
    }
    setAmountError("");
    try {
      await axios.put(`http://localhost:8080/refund/update/${id}`, income);
      setMessage("Income has been updated successfully!");
      navigate("/viewrefund");
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f7f7fa",
      }}
    >
      <div
        className="container"
        style={{
          width: "40%",
          padding: "40px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginTop: "20px",
        }}
      >
        <FinanceSideMenu />
        <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
          <div className="form-group" style={{ marginBottom: "30px" }}>
            <h2
              style={{
                color: "#192841",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Update Income
            </h2>
            {message && (
              <div
                style={{
                  color: "#28a745",
                  textAlign: "center",
                  marginBottom: "20px",
                  fontWeight: "500",
                }}
              >
                {message}
              </div>
            )}
          </div>

          {requiredError && (
            <div
              style={{
                color: "#dc3545",
                fontSize: "14px",
                marginBottom: "15px",
                padding: "10px",
                background: "#fff5f5",
                borderRadius: "6px",
                border: "1px solid #ffcdd2",
              }}
            >
              {requiredError}
            </div>
          )}

          {idError && (
            <div
              style={{
                color: "#dc3545",
                fontSize: "14px",
                marginBottom: "15px",
                padding: "10px",
                background: "#fff5f5",
                borderRadius: "6px",
                border: "1px solid #ffcdd2",
              }}
            >
              {idError}
            </div>
          )}

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="RefundID"
              style={{
                color: "#192841",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Income ID
            </label>
            <input
              type="number"
              className="form-control"
              name="RefundID"
              placeholder="Enter Income ID"
              value={income.RefundID}
              onChange={handleChange}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
                fontSize: "14px",
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="CustomerID"
              style={{
                color: "#192841",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Customer ID
            </label>
            <input
              type="number"
              className="form-control"
              name="CustomerID"
              placeholder="Enter Customer ID"
              value={income.CustomerID}
              onChange={handleChange}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
                fontSize: "14px",
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="OrderID"
              style={{
                color: "#192841",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Order ID
            </label>
            <input
              type="number"
              className="form-control"
              name="OrderID"
              placeholder="Enter Order ID"
              value={income.OrderID}
              onChange={handleChange}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
                fontSize: "14px",
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="RequestedDate"
              style={{
                color: "#192841",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Requested Date
            </label>
            <input
              type="date"
              className="form-control"
              name="RequestedDate"
              value={income.RequestedDate}
              onChange={handleChange}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
                fontSize: "14px",
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="Quantity"
              style={{
                color: "#192841",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              name="Quantity"
              placeholder="Enter Quantity"
              value={income.Quantity}
              onChange={handleChange}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
                fontSize: "14px",
              }}
            />
            {quantityError && (
              <div
                style={{
                  color: "#dc3545",
                  fontSize: "14px",
                  marginTop: "8px",
                  padding: "8px",
                  background: "#fff5f5",
                  borderRadius: "6px",
                  border: "1px solid #ffcdd2",
                }}
              >
                {quantityError}
              </div>
            )}
          </div>

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="Amount_LKR"
              style={{
                color: "#192841",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Amount (LKR)
            </label>
            <input
              type="number"
              className="form-control"
              name="Amount_LKR"
              placeholder="Enter Amount"
              value={income.Amount_LKR}
              onChange={handleChange}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
                fontSize: "14px",
              }}
            />
            {amountError && (
              <div
                style={{
                  color: "#dc3545",
                  fontSize: "14px",
                  marginTop: "8px",
                  padding: "8px",
                  background: "#fff5f5",
                  borderRadius: "6px",
                  border: "1px solid #ffcdd2",
                }}
              >
                {amountError}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "8px",
              background: "#192841",
              border: "none",
              transition: "all 0.3s ease",
              marginTop: "10px",
            }}
          >
            Update Income
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateIncome;
