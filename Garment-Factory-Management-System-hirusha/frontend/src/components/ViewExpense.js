import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ViewExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/budget");
      setExpenses(res.data || []);
      setLoading(false);
    } catch (err) {
      alert("Error fetching expenses");
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/viewbudget/updatebudget/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await axios.delete(`http://localhost:8080/budget/delete/${id}`);
        fetchExpenses();
        alert("Expense deleted successfully!");
      } catch (err) {
        alert("Delete unsuccessful");
      }
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  // PDF Export
  const generateReport = () => {
    const doc = new jsPDF();
    const title = "Expenses";
    doc.setFontSize(15);
    doc.setTextColor(128, 0, 0);
    doc.text(title, 100, 10, null, null, "center");
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.setFontSize(8);
    doc.text(
      `*This Expenses Report is automatically generated.`,
      20,
      35,
      null,
      null
    );
    const headers = [
      [
        "ExpenseID",
        "Date",
        "TransportExpense_LKR",
        "StockExpense_LKR",
        "SalaryExpense_LKR",
        "OtherExpenses_LKR",
      ],
    ];
    const data = filteredExpenses.map((item) => [
      item.ExpenseID || "",
      item.Date
        ? new Date(item.Date).toISOString().slice(0, 10)
        : item.Month && item.Year
        ? `${item.Year}-${String(item.Month).padStart(2, "0")}-01`
        : "",
      item.TransportBudget_LKR,
      item.StockBudget_LKR,
      item.SalaryBudget_LKR,
      item.OtherCostsBudget_LKR,
    ]);
    let contents = {
      startY: 20,
      head: headers,
      body: data,
    };
    doc.autoTable(contents);
    doc.save("Expense_Report.pdf");
  };

  // Filtered expenses by search (ExpenseID only)
  const filteredExpenses = expenses.filter((item) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      item.ExpenseID &&
      item.ExpenseID.toString().toLowerCase().includes(searchLower)
    );
  });

  // Calculate total for each column
  const total = {
    TransportBudget_LKR: 0,
    StockBudget_LKR: 0,
    SalaryBudget_LKR: 0,
    OtherCostsBudget_LKR: 0,
  };
  filteredExpenses.forEach((item) => {
    total.TransportBudget_LKR += Number(item.TransportBudget_LKR) || 0;
    total.StockBudget_LKR += Number(item.StockBudget_LKR) || 0;
    total.SalaryBudget_LKR += Number(item.SalaryBudget_LKR) || 0;
    total.OtherCostsBudget_LKR += Number(item.OtherCostsBudget_LKR) || 0;
  });

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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginLeft: 0,
            marginRight: "5vw",
            maxWidth: 1200,
            width: "100%",
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              marginBottom: 32,
              color: "#222",
              fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
              textAlign: "center",
            }}
          >
            Expenses
          </h2>
          <div
            style={{
              width: "100%",
              maxWidth: 400,
              marginBottom: 24,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search by Expense ID..."
              style={{
                width: "100%",
                padding: "10px 16px",
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                fontSize: 15,
                outline: "none",
                background: "#f7f7fa",
                color: "#222",
                marginBottom: 0,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <button
              className="btn btn-primary"
              style={{
                background: "#2ec4b6",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                padding: "10px 24px",
                minWidth: 120,
              }}
              onClick={generateReport}
            >
              Export Report
            </button>
            <button
              className="btn btn-success"
              style={{
                background: "#d72660",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                padding: "10px 24px",
                minWidth: 120,
              }}
              onClick={() => navigate("/addexpense")}
            >
              Add Expense
            </button>
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              boxShadow: "0 4px 24px #e5e7eb",
              padding: "4vw",
              marginTop: 24,
              width: "100%",
              overflowX: "auto",
            }}
          >
            <table
              className="table table-striped"
              style={{
                fontSize: "100%",
                borderRadius: 12,
                overflow: "hidden",
                background: "#fff",
                minWidth: 900,
              }}
            >
              <thead style={{ background: "#f7f7fa", fontWeight: 700 }}>
                <tr>
                  <th>ExpenseID</th>
                  <th>Date</th>
                  <th>TransportExpense_LKR</th>
                  <th>StockExpense_LKR</th>
                  <th>SalaryExpense_LKR</th>
                  <th>OtherExpenses_LKR</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((item, idx) => (
                  <tr
                    key={item._id || idx}
                    style={{ background: idx % 2 === 0 ? "#fff" : "#f7f7fa" }}
                  >
                    <td>{item.ExpenseID || ""}</td>
                    <td>
                      {item.Date
                        ? new Date(item.Date).toISOString().slice(0, 10)
                        : item.Month && item.Year
                        ? `${item.Year}-${String(item.Month).padStart(
                            2,
                            "0"
                          )}-01`
                        : ""}
                    </td>
                    <td>{item.TransportBudget_LKR}</td>
                    <td>{item.StockBudget_LKR}</td>
                    <td>{item.SalaryBudget_LKR}</td>
                    <td>{item.OtherCostsBudget_LKR}</td>
                    <td>
                      <button
                        className="btn btn-outline-warning"
                        style={{
                          height: 30,
                          width: 40,
                          marginRight: 8,
                          borderRadius: 8,
                          fontWeight: 600,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => handleEdit(item._id)}
                        title="Edit"
                      >
                        <i className="fa fa-thin fa-pen-to-square"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        style={{
                          height: 30,
                          width: 40,
                          borderRadius: 8,
                          fontWeight: 600,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => handleDelete(item._id)}
                        title="Delete"
                      >
                        <i className="fa fa-thin fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginTop: "16px",
                color: "#d72660",
              }}
            >
              Total Expenses:{" "}
              {(
                total.TransportBudget_LKR +
                total.StockBudget_LKR +
                total.SalaryBudget_LKR +
                total.OtherCostsBudget_LKR
              ).toLocaleString()}{" "}
              LKR
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExpense;
