import React, { Component } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

class ViewIncomes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refund: [],
      search: "",
    };
  }

  componentDidMount() {
    this.retrieveRefund();
  }

  retrieveRefund() {
    axios.get("http://localhost:8080/refund").then((res) => {
      if (res.data.success) {
        this.setState({
          refund: res.data.existingRefunds,
        });

        console.log(this.state.refund);
      }
    });
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleSearch = (e) => {
    e.preventDefault();
    // No need to do anything here, filtering is handled in render
  };

  formatDate(dateString) {
    if (!dateString) return "";
    return dateString.split("T")[0];
  }

  generateReport = () => {
    const doc = new jsPDF();
    const title = "Incomes";
    doc.setFontSize(15);
    doc.setTextColor(128, 0, 0);
    doc.text(title, 100, 10, null, null, "center");
    doc.setTextColor(0);
    doc.setFontSize(12);

    doc.setFontSize(8);
    doc.text(
      `*This Incomes Report is automatically generated.`,
      20,
      35,
      null,
      null
    );

    const headers = [
      [
        "Income ID",
        "CustomerID",
        "OrderID",
        "RequestedDate",
        "Quantity",
        "Amount(LKR)",
      ],
    ];

    const data = this.state.refund.map((income) => [
      income.RefundID ?? income.IncomeID,
      income.CustomerID,
      income.OrderID,
      this.formatDate(income.RequestedDate),
      income.Quantity || 0,
      income.Amount_LKR,
    ]);

    let contents = {
      startY: 20,
      head: headers,
      body: data,
    };
    doc.autoTable(contents);
    doc.save("Income_Report.pdf");
  };

  // Function to calculate total incomes
  getTotalIncomes = () => {
    return this.state.refund.reduce((sum, item) => {
      const value = Number(item.Amount_LKR) || 0;
      return sum + value;
    }, 0);
  };

  deleteRefund = async (id) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      try {
        await axios.delete(`/refund/delete/${id}`);
        this.retrieveRefund(); // Refresh the list
        alert("Income deleted successfully!");
      } catch (err) {
        alert("Delete unsuccessful");
      }
    }
  };

  handleEdit = (id) => {
    this.props.navigate(`/updaterefunds/${id}`);
  };

  render() {
    const { refund, search } = this.state;
    // Filtered incomes by search (CustomerID or OrderID)
    const filteredIncomes = refund.filter((item) => {
      if (!search) return true;
      return (
        (item.CustomerID &&
          item.CustomerID.toString()
            .toLowerCase()
            .includes(search.toLowerCase())) ||
        (item.OrderID &&
          item.OrderID.toString().toLowerCase().includes(search.toLowerCase()))
      );
    });
    // Calculate total income
    const totalIncome = filteredIncomes.reduce(
      (sum, item) => sum + (Number(item.Amount_LKR) || 0),
      0
    );
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
              }}
            >
              Incomes
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
                onChange={this.handleSearchChange}
                placeholder="Search by Customer ID..."
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
                className="btn btn-success"
                style={{
                  background: "#d72660",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 600,
                  padding: "10px 24px",
                  minWidth: 120,
                }}
                onClick={() => this.props.navigate("/addrefunds")}
              >
                Add Income
              </button>
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
                onClick={this.generateReport}
              >
                Export Report
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
                  minWidth: 700,
                }}
              >
                <thead style={{ background: "#f7f7fa", fontWeight: 700 }}>
                  <tr>
                    <th>CustomerID</th>
                    <th>OrderID</th>
                    <th>RequestedDate</th>
                    <th>Quantity</th>
                    <th>Amount_LKR</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIncomes.map((item, idx) => (
                    <tr
                      key={item._id || idx}
                      style={{ background: idx % 2 === 0 ? "#fff" : "#f7f7fa" }}
                    >
                      <td>{item.CustomerID}</td>
                      <td>{item.OrderID}</td>
                      <td>{this.formatDate(item.RequestedDate)}</td>
                      <td>{item.Quantity}</td>
                      <td>{item.Amount_LKR}</td>
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
                          onClick={() => this.handleEdit(item._id)}
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
                          onClick={() => this.deleteRefund(item._id)}
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
                Total Incomes: {totalIncome.toLocaleString()} LKR
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function ViewIncomesWithNavigate(props) {
  const navigate = useNavigate();
  return <ViewIncomes {...props} navigate={navigate} />;
}

export default ViewIncomesWithNavigate;
