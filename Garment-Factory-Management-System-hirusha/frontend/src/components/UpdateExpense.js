import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import FinanceSideMenu from "./FinanceSideMenu";

const UpdateExpense = () => {
  const { id } = useParams();
  const [expenses, setExpenses] = useState({
    ExpenseID: "",
    Date: "",
    TransportBudget_LKR: "",
    StockBudget_LKR: "",
    SalaryBudget_LKR: "",
    OtherCostsBudget_LKR: "",
  });

  const [message, setMessage] = useState("");
  const [monthError, setMonthError] = useState("");
  const [expenseError, setExpenseError] = useState("");
  const [requiredError, setRequiredError] = useState("");

  const {
    ExpenseID,
    Date: ExpenseDate,
    TransportBudget_LKR,
    StockBudget_LKR,
    SalaryBudget_LKR,
    OtherCostsBudget_LKR,
  } = expenses;

  const navigate = useNavigate();

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const result = await axios.get("http://localhost:8080/budget/post/" + id);
    setExpenses(result.data);
  };

  const HandleChange = (e) => {
    // Expense fields validation
    if (
      [
        "TransportBudget_LKR",
        "StockBudget_LKR",
        "SalaryBudget_LKR",
        "OtherCostsBudget_LKR",
      ].includes(e.target.name)
    ) {
      const value = parseFloat(e.target.value);
      if (value < 0) {
        setExpenseError("Expense values cannot be negative");
      } else {
        setExpenseError("");
      }
    }
    setExpenses({ ...expenses, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    // Required fields validation
    if (
      !ExpenseID ||
      !ExpenseDate ||
      !TransportBudget_LKR ||
      !StockBudget_LKR ||
      !SalaryBudget_LKR ||
      !OtherCostsBudget_LKR
    ) {
      setRequiredError("All fields are required, including Expense ID.");
      return;
    }
    setRequiredError("");
    // Validate negative expenses
    const expenseFields = [
      TransportBudget_LKR,
      StockBudget_LKR,
      SalaryBudget_LKR,
      OtherCostsBudget_LKR,
    ];
    if (expenseFields.some((val) => parseFloat(val) < 0)) {
      setExpenseError("Expense values cannot be negative");
      return;
    }
    setExpenseError("");
    // Calculate total
    const total = expenseFields
      .map(Number)
      .reduce((a, b) => a + (isNaN(b) ? 0 : b), 0);
    const expensesToSend = { ...expenses, TotalBudget_LKR: total };
    await axios
      .put("http://localhost:8080/budget/update/" + id, expensesToSend)
      .then((result) => {
        alert("Expense has been updated successfully!");
        navigate("/viewbudget");
      })
      .catch((err) => {
        alert("Something went wrong!");
      });
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
        <form onSubmit={(e) => submitForm(e)} style={{ padding: "20px" }}>
          <div className="form-group" style={{ marginBottom: "30px" }}>
            <h2
              style={{
                color: "#192841",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              Update Expense
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
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label
              htmlFor="ExpenseID"
              style={{
                color: "#192841",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Expense ID
            </label>
            <input
              type="number"
              className="form-control"
              name="ExpenseID"
              placeholder="Enter Expense ID"
              value={ExpenseID}
              onChange={(e) => HandleChange(e)}
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
              htmlFor="Date"
              style={{
                color: "#192841",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              Date
            </label>
            <input
              type="date"
              className="form-control"
              name="Date"
              value={ExpenseDate}
              onChange={(e) => HandleChange(e)}
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
              htmlFor="TransportBudget_LKR"
              style={{
                color: "#192841",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              TransportExpense_LKR
            </label>
            <input
              type="number"
              className="form-control"
              name="TransportBudget_LKR"
              value={TransportBudget_LKR}
              onChange={(e) => HandleChange(e)}
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
              htmlFor="StockBudget_LKR"
              style={{
                color: "#192841",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              StockExpense_LKR
            </label>
            <input
              type="number"
              className="form-control"
              name="StockBudget_LKR"
              value={StockBudget_LKR}
              onChange={(e) => HandleChange(e)}
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
              htmlFor="SalaryBudget_LKR"
              style={{
                color: "#192841",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              SalaryExpense_LKR
            </label>
            <input
              type="number"
              className="form-control"
              name="SalaryBudget_LKR"
              value={SalaryBudget_LKR}
              onChange={(e) => HandleChange(e)}
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
              htmlFor="OtherCostsBudget_LKR"
              style={{
                color: "#192841",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              OtherExpenses_LKR
            </label>
            <input
              type="number"
              className="form-control"
              name="OtherCostsBudget_LKR"
              value={OtherCostsBudget_LKR}
              onChange={(e) => HandleChange(e)}
              style={{
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                transition: "all 0.3s ease",
                fontSize: "14px",
              }}
            />
          </div>
          {expenseError && (
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
              {expenseError}
            </div>
          )}
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
            Update Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpense;
