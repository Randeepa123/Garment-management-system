import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import jsPDF from "jspdf";

export default function Profit() {
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
    profitBeforeTax: 0,
    profitAfterTax: 0,
  });

  // Utility to get accounting period string and date range
  function getAccountingPeriod() {
    const today = new Date();
    let startYear, endYear, start, end;
    if (today.getMonth() + 1 >= 4) {
      // April or later
      startYear = today.getFullYear();
      endYear = today.getFullYear() + 1;
      start = new Date(startYear, 3, 1); // April 1
      end = new Date(endYear, 2, 31); // March 31
    } else {
      startYear = today.getFullYear() - 1;
      endYear = today.getFullYear();
      start = new Date(startYear, 3, 1); // April 1
      end = new Date(endYear, 2, 31); // March 31
    }
    return {
      label: `${startYear} April 01 to ${endYear} March 31`,
      start,
      end,
    };
  }
  const {
    label: periodLabel,
    start: periodStart,
    end: periodEnd,
  } = getAccountingPeriod();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all expenses
        const expensesRes = await axios.get("http://localhost:8080/budget");
        const expenses = expensesRes.data || [];
        // Fetch all incomes
        const incomesRes = await axios.get("http://localhost:8080/refund");
        const incomes = incomesRes.data.existingRefunds || [];

        // All-time totals (for display)
        const totalIncomeAll = incomes.reduce(
          (sum, item) => sum + (Number(item.Amount_LKR) || 0),
          0
        );
        const totalExpenseAll = expenses.reduce(
          (sum, item) =>
            sum + (Number(item.TotalExpense_LKR || item.TotalBudget_LKR) || 0),
          0
        );
        setTotalIncomes(totalIncomeAll);
        setTotalExpenses(totalExpenseAll);

        // Filter by accounting period (for calculations)
        const filteredIncomes = incomes.filter((item) => {
          const d = new Date(item.RequestedDate);
          return d >= periodStart && d <= periodEnd;
        });
        const filteredExpenses = expenses.filter((item) => {
          const d = item.Date ? new Date(item.Date) : null;
          return d && d >= periodStart && d <= periodEnd;
        });

        // Calculate period totals for tax only
        const periodIncome = filteredIncomes.reduce(
          (sum, item) => sum + (Number(item.Amount_LKR) || 0),
          0
        );
        const periodExpense = filteredExpenses.reduce(
          (sum, item) =>
            sum + (Number(item.TotalExpense_LKR || item.TotalBudget_LKR) || 0),
          0
        );
        const totalSalaryExpense = filteredExpenses.reduce(
          (sum, item) =>
            sum +
            (Number(item.SalaryExpense_LKR || item.SalaryBudget_LKR) || 0),
          0
        );

        // Profit Before Tax is all-time incomes - all-time expenses
        const profitBeforeTax = totalIncomeAll - totalExpenseAll;
        const corporateTax = periodIncome * 0.15;
        const vat = periodIncome * 0.08;
        const epf = totalSalaryExpense * 0.08;
        const etf = totalSalaryExpense * 0.03;
        const otherTaxes = 10000;
        const totalTaxation = corporateTax + vat + epf + etf + otherTaxes;
        const profitAfterTax = profitBeforeTax - totalTaxation;

        setTaxCalculations({
          epf,
          etf,
          corporateTax,
          vat,
          otherTaxes,
          totalTaxation,
          profitBeforeTax,
          profitAfterTax,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [periodStart, periodEnd]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Profit Report", 105, 15, null, null, "center");
    doc.setFontSize(12);
    doc.text(`Accounting Period: ${periodLabel}`, 15, 30);
    doc.autoTable({
      startY: 40,
      head: [["Item", "Amount (LKR)"]],
      body: [
        ["Total Incomes", totalIncomes.toLocaleString()],
        ["Total Expenses", totalExpenses.toLocaleString()],
        ["Profit Before Tax", taxCalculations.profitBeforeTax.toLocaleString()],
        ["Total Taxation", taxCalculations.totalTaxation.toLocaleString()],
        ["Profit After Tax", taxCalculations.profitAfterTax.toLocaleString()],
      ],
    });
    doc.setFontSize(14);
    doc.setTextColor(215, 38, 96);
    doc.text(
      `Profit After Tax: LKR ${taxCalculations.profitAfterTax.toLocaleString()}`,
      15,
      doc.lastAutoTable.finalY + 15
    );
    doc.save("Profit_Report.pdf");
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
            Profit
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
              {periodLabel}
            </span>
            <button
              className="btn btn-primary"
              style={{
                background: "#d72660",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                padding: "10px 24px",
                boxShadow: "0 2px 8px #d7266022",
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
                Profit Summary
              </h3>
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
                    <td style={{ padding: "12px 8px" }}>Total Incomes</td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "12px 8px",
                        color: "#222",
                      }}
                    >
                      LKR {totalIncomes.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "12px 8px" }}>Total Expenses</td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "12px 8px",
                        color: "#222",
                      }}
                    >
                      LKR {totalExpenses.toLocaleString()}
                    </td>
                  </tr>
                  <tr style={{ background: "#f7f7fa" }}>
                    <td style={{ padding: "12px 8px" }}>Profit Before Tax</td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "12px 8px",
                        color: "#222",
                      }}
                    >
                      LKR {taxCalculations.profitBeforeTax.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "12px 8px" }}>Total Taxation</td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "12px 8px",
                        color: "#d72660",
                      }}
                    >
                      LKR {taxCalculations.totalTaxation.toLocaleString()}
                    </td>
                  </tr>
                  <tr style={{ fontWeight: 700, borderTop: "2px solid #eee" }}>
                    <td style={{ padding: "12px 8px", color: "#d72660" }}>
                      Profit After Tax
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        padding: "12px 8px",
                        color: "#d72660",
                      }}
                    >
                      LKR {taxCalculations.profitAfterTax.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
