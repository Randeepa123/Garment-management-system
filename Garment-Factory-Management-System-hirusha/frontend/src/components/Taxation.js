import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Taxation() {
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [salaryExpenses, setSalaryExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [taxCalculations, setTaxCalculations] = useState({
    epf: 0,
    etf: 0,
    corporateTax: 0,
    vat: 0,
    otherTaxes: 10000,
    totalTaxation: 0,
    netProfitAfterTax: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all expenses
        const expensesRes = await axios.get("http://localhost:8080/budget");
        const expenses = expensesRes.data || [];

        // Calculate total salary expenses from all expense records
        const totalSalaryExpense = expenses.reduce((sum, item) => {
          // Check for both possible field names
          const salaryExpense = Number(
            item.SalaryExpense_LKR || item.SalaryBudget_LKR || 0
          );
          return sum + (isNaN(salaryExpense) ? 0 : salaryExpense);
        }, 0);

        // Fetch all incomes
        const incomesRes = await axios.get("http://localhost:8080/refund");
        const incomes = incomesRes.data.existingRefunds || [];

        const totalIncome = incomes.reduce(
          (sum, item) => sum + (Number(item.Amount_LKR) || 0),
          0
        );
        const totalExpense = expenses.reduce(
          (sum, item) =>
            sum + (Number(item.TotalExpense_LKR || item.TotalBudget_LKR) || 0),
          0
        );

        setTotalIncomes(totalIncome);
        setTotalExpenses(totalExpense);
        setSalaryExpenses(totalSalaryExpense);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Automatically calculate all taxes when salary expenses change
    const profit = totalIncomes - totalExpenses;
    const corporateTax = totalIncomes * 0.15;
    const vat = totalIncomes * 0.08;
    const epf = salaryExpenses * 0.08;
    const etf = salaryExpenses * 0.03;
    const otherTaxes = 10000;
    const totalTaxation = corporateTax + vat + epf + etf + otherTaxes;
    const netProfitAfterTax = profit - totalTaxation;

    setTaxCalculations({
      epf,
      etf,
      corporateTax,
      vat,
      otherTaxes,
      totalTaxation,
      netProfitAfterTax,
    });
  }, [totalIncomes, totalExpenses, salaryExpenses]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Taxation Report", 105, 15, null, null, "center");
    doc.setFontSize(12);
    doc.text(
      `Total Salary Expenses: LKR ${salaryExpenses.toLocaleString()}`,
      15,
      30
    );
    doc.autoTable({
      startY: 40,
      head: [["Tax Type", "Amount (LKR)"]],
      body: [
        [
          "Corporate Income Tax (15% of Total Income)",
          taxCalculations.corporateTax.toLocaleString(),
        ],
        [
          "Value Added Tax (VAT - 8% of Total Income)",
          taxCalculations.vat.toLocaleString(),
        ],
        [
          "Employee Provident Fund (EPF - 8% of Salary)",
          taxCalculations.epf.toLocaleString(),
        ],
        [
          "Employee Trust Fund (ETF - 3% of Salary)",
          taxCalculations.etf.toLocaleString(),
        ],
        ["Other Business Taxes", taxCalculations.otherTaxes.toLocaleString()],
        ["Total Taxation", taxCalculations.totalTaxation.toLocaleString()],
      ],
    });
    doc.setFontSize(14);
    doc.setTextColor(215, 38, 96);
    doc.text(
      `Net Profit After Tax: LKR ${taxCalculations.netProfitAfterTax.toLocaleString()}`,
      15,
      doc.lastAutoTable.finalY + 15
    );
    doc.save("Taxation_Report.pdf");
  };

  // Utility to get taxation period string
  function getTaxationPeriod() {
    const today = new Date();
    let startYear, endYear;
    if (today.getMonth() + 1 >= 4) {
      // April or later
      startYear = today.getFullYear();
      endYear = today.getFullYear() + 1;
    } else {
      startYear = today.getFullYear() - 1;
      endYear = today.getFullYear();
    }
    return `${startYear} April 01 to ${endYear} March 31`;
  }

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
        <div style={{ width: "100%", maxWidth: 600 }}>
          <h2
            style={{
              fontWeight: 700,
              marginBottom: 32,
              color: "#222",
              marginTop: 24,
              textAlign: "center",
            }}
          >
            Taxation
          </h2>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              marginBottom: 24,
            }}
          >
            <span
              style={{
                fontSize: 18,
                color: "#fff",
                fontWeight: 700,
                background: "linear-gradient(90deg, #d72660 0%, #fbb13c 100%)",
                padding: "8px 24px",
                borderRadius: 16,
                boxShadow: "0 2px 12px rgba(215,38,96,0.12)",
                letterSpacing: 1,
                border: "2px solid #fff",
                transition: "box-shadow 0.2s",
                textShadow: "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              {getTaxationPeriod()}
            </span>
            <button
              className="btn btn-primary"
              style={{
                background: "#d72660",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                padding: "10px 24px",
              }}
              onClick={handleDownloadPDF}
            >
              Export Report
            </button>
          </div>
          {loading ? (
            <div style={{ textAlign: "center" }}>Loading...</div>
          ) : (
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 4px 24px #e5e7eb",
                padding: 40,
                maxWidth: 600,
                width: "100%",
                margin: "0 auto",
              }}
            >
              <h3
                style={{ marginBottom: 24, color: "#d72660", fontWeight: 700 }}
              >
                Taxation / EPF / ETF
              </h3>
              <div style={{ marginBottom: 16, fontSize: 16, color: "#222" }}>
                <strong>Total Salary Expenses:</strong> LKR{" "}
                {salaryExpenses.toLocaleString()}
              </div>
              <table
                style={{
                  width: "100%",
                  marginBottom: 24,
                  borderCollapse: "separate",
                  borderSpacing: 0,
                }}
              >
                <tbody>
                  <tr style={{ background: "#f7f7fa", fontWeight: 600 }}>
                    <td style={{ padding: "12px 8px" }}>
                      Corporate Income Tax (15% of Total Income)
                    </td>
                    <td style={{ textAlign: "right", padding: "12px 8px" }}>
                      LKR {taxCalculations.corporateTax.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "12px 8px" }}>
                      Value Added Tax (VAT - 8% of Total Income)
                    </td>
                    <td style={{ textAlign: "right", padding: "12px 8px" }}>
                      LKR {taxCalculations.vat.toLocaleString()}
                    </td>
                  </tr>
                  <tr style={{ background: "#f7f7fa" }}>
                    <td style={{ padding: "12px 8px" }}>
                      Employee Provident Fund (EPF - 8% of Salary)
                    </td>
                    <td style={{ textAlign: "right", padding: "12px 8px" }}>
                      LKR {taxCalculations.epf.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "12px 8px" }}>
                      Employee Trust Fund (ETF - 3% of Salary)
                    </td>
                    <td style={{ textAlign: "right", padding: "12px 8px" }}>
                      LKR {taxCalculations.etf.toLocaleString()}
                    </td>
                  </tr>
                  <tr style={{ background: "#f7f7fa" }}>
                    <td style={{ padding: "12px 8px" }}>
                      Other Business Taxes
                    </td>
                    <td style={{ textAlign: "right", padding: "12px 8px" }}>
                      LKR {taxCalculations.otherTaxes.toLocaleString()}
                    </td>
                  </tr>
                  <tr style={{ fontWeight: 700, borderTop: "2px solid #eee" }}>
                    <td style={{ padding: "12px 8px" }}>Total Taxation</td>
                    <td style={{ textAlign: "right", padding: "12px 8px" }}>
                      LKR {taxCalculations.totalTaxation.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#d72660",
                  marginTop: 16,
                }}
              >
                Net Profit After Tax: LKR{" "}
                {taxCalculations.netProfitAfterTax.toLocaleString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
