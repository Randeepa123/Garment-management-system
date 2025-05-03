import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Analytics() {
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [incomeCount, setIncomeCount] = useState(0);
  const [totalSoldProducts, setTotalSoldProducts] = useState(0);
  const [expenseDistribution, setExpenseDistribution] = useState([]);
  const [taxDistribution, setTaxDistribution] = useState([]);
  const [profitTrend, setProfitTrend] = useState([]);
  const [incomeByCustomer, setIncomeByCustomer] = useState([]);
  const [monthlyGrowth, setMonthlyGrowth] = useState([]);
  const [expenseEfficiency, setExpenseEfficiency] = useState([]);
  const chartRef = useRef();
  const summaryRef = useRef();

  // Make monthNames available everywhere in the component
  const monthNames = [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
  ];

  const COLORS = [
    "#d72660",
    "#fbb13c",
    "#2ec4b6",
    "#1b9aaa",
    "#ff9f1c",
    "#e71d36",
    "#2ec4b6",
    "#ff9f1c",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const incomesRes = await axios.get("http://localhost:8080/refund");
      const expensesRes = await axios.get("http://localhost:8080/budget");
      const incomes = incomesRes.data.existingRefunds || [];
      const expenses = expensesRes.data || [];

      // Calculate totals
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
      setIncomeCount(incomes.length);
      setTotalSoldProducts(
        incomes.reduce((sum, item) => sum + (Number(item.Quantity) || 0), 0)
      );

      // Monthly data for charts
      // Accounting period: April to March
      const months = [
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "01",
        "02",
        "03",
      ];
      const monthly = months.map((month, idx) => {
        const incomeSum = incomes
          .filter((i) => (i.RequestedDate || "").slice(5, 7) === month)
          .reduce((sum, i) => sum + (Number(i.Amount_LKR) || 0), 0);
        const expenseSum = expenses
          .filter(
            (e) =>
              (e.Date
                ? new Date(e.Date).toISOString().slice(5, 7)
                : (e.Month || "").toString().padStart(2, "0")) === month
          )
          .reduce(
            (sum, e) =>
              sum + (Number(e.TotalExpense_LKR || e.TotalBudget_LKR) || 0),
            0
          );
        return {
          name: monthNames[idx] || month,
          Incomes: incomeSum,
          Expenses: expenseSum,
          Profit: incomeSum - expenseSum,
        };
      });
      setMonthlyData(monthly);

      // Expense distribution data
      const expenseDist = [
        {
          name: "Transport",
          value: expenses.reduce(
            (sum, item) => sum + (Number(item.TransportBudget_LKR) || 0),
            0
          ),
        },
        {
          name: "Stock",
          value: expenses.reduce(
            (sum, item) => sum + (Number(item.StockBudget_LKR) || 0),
            0
          ),
        },
        {
          name: "Salary",
          value: expenses.reduce(
            (sum, item) => sum + (Number(item.SalaryBudget_LKR) || 0),
            0
          ),
        },
        {
          name: "Other",
          value: expenses.reduce(
            (sum, item) => sum + (Number(item.OtherCostsBudget_LKR) || 0),
            0
          ),
        },
      ];
      setExpenseDistribution(expenseDist);

      // Tax distribution data
      const salaryExpense = expenses.reduce(
        (sum, item) => sum + (Number(item.SalaryBudget_LKR) || 0),
        0
      );
      const taxDist = [
        {
          name: "Corporate Tax",
          value: totalIncome * 0.15,
        },
        {
          name: "VAT",
          value: totalIncome * 0.08,
        },
        {
          name: "EPF",
          value: salaryExpense * 0.08,
        },
        {
          name: "ETF",
          value: salaryExpense * 0.03,
        },
        {
          name: "Other Taxes",
          value: 10000,
        },
      ];
      setTaxDistribution(taxDist);

      // Profit trend data
      const profitData = monthly.map((item) => ({
        name: item.name,
        Profit: item.Profit,
      }));
      setProfitTrend(profitData);

      // Income by Customer data
      const customerIncomes = {};
      incomes.forEach((income) => {
        const customerId = income.CustomerID;
        if (!customerIncomes[customerId]) {
          customerIncomes[customerId] = 0;
        }
        customerIncomes[customerId] += Number(income.Amount_LKR) || 0;
      });
      const customerData = Object.entries(customerIncomes)
        .map(([id, value]) => ({ name: `Customer ${id}`, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
      setIncomeByCustomer(customerData);

      // Monthly Growth data
      const growthData = monthly.map((item, index) => {
        const prevMonth = index > 0 ? monthly[index - 1].Incomes : 0;
        const growth = prevMonth
          ? ((item.Incomes - prevMonth) / prevMonth) * 100
          : 0;
        return {
          name: item.name,
          Growth: growth,
        };
      });
      setMonthlyGrowth(growthData);

      // Expense Efficiency data
      const efficiencyData = monthly.map((item) => ({
        name: item.name,
        Efficiency: item.Incomes > 0 ? (item.Profit / item.Incomes) * 100 : 0,
      }));
      setExpenseEfficiency(efficiencyData);

      setLoading(false);
    };
    fetchData();
  }, []);

  const revenue = totalIncomes - totalExpenses;
  const averageSales = incomeCount > 0 ? totalIncomes / incomeCount : 0;

  // Calculate current and previous month indices for accounting period (April-March)
  const now = new Date();
  // April is index 0, so adjust accordingly
  const fiscalMonthIdx = (now.getMonth() + 12 - 3) % 12; // April=0, May=1, ..., March=11
  const prevFiscalMonthIdx = (fiscalMonthIdx - 1 + 12) % 12;
  const currentMonthName = monthNames[fiscalMonthIdx];
  const prevMonthName = monthNames[prevFiscalMonthIdx];

  // Helper to get value for a month
  const getMonthData = (month, key) => {
    const found = monthlyData.find((item) => item.name === month);
    return found ? found[key] : 0;
  };

  // Average Sales (Incomes)
  const avgSalesCurrent = getMonthData(currentMonthName, "Incomes");
  const avgSalesPrev = getMonthData(prevMonthName, "Incomes");
  const avgSalesChange =
    avgSalesPrev !== 0
      ? ((avgSalesCurrent - avgSalesPrev) / Math.abs(avgSalesPrev)) * 100
      : 0;

  // Total Orders (Incomes)
  const totalOrdersCurrent = getMonthData(currentMonthName, "Incomes");
  const totalOrdersPrev = getMonthData(prevMonthName, "Incomes");
  const totalOrdersChange =
    totalOrdersPrev !== 0
      ? ((totalOrdersCurrent - totalOrdersPrev) / Math.abs(totalOrdersPrev)) *
        100
      : 0;

  // Sold Products
  const soldProductsCurrent = getMonthData(currentMonthName, "SoldProducts");
  const soldProductsPrev = getMonthData(prevMonthName, "SoldProducts");
  const soldProductsChange =
    soldProductsPrev !== 0
      ? ((soldProductsCurrent - soldProductsPrev) /
          Math.abs(soldProductsPrev)) *
        100
      : 0;

  // Total Incomes
  const totalIncomesCurrent = getMonthData(currentMonthName, "Incomes");
  const totalIncomesPrev = getMonthData(prevMonthName, "Incomes");
  const totalIncomesChange =
    totalIncomesPrev !== 0
      ? ((totalIncomesCurrent - totalIncomesPrev) /
          Math.abs(totalIncomesPrev)) *
        100
      : 0;

  // Total Expenses
  const totalExpensesCurrent = getMonthData(currentMonthName, "Expenses");
  const totalExpensesPrev = getMonthData(prevMonthName, "Expenses");
  const totalExpensesChange =
    totalExpensesPrev !== 0
      ? ((totalExpensesCurrent - totalExpensesPrev) /
          Math.abs(totalExpensesPrev)) *
        100
      : 0;

  // Revenue
  const revenueCurrent = totalIncomesCurrent - totalExpensesCurrent;
  const revenuePrev = totalIncomesPrev - totalExpensesPrev;
  const revenueChange =
    revenuePrev !== 0
      ? ((revenueCurrent - revenuePrev) / Math.abs(revenuePrev)) * 100
      : 0;

  // Helper to format change
  const formatChange = (change) => {
    if (change > 0)
      return (
        <span style={{ color: "#10b981", fontWeight: 600 }}>
          ↗ {change.toFixed(2)}%{" "}
          <span style={{ color: "#888", fontWeight: 400 }}>
            from last month.
          </span>
        </span>
      );
    if (change < 0)
      return (
        <span style={{ color: "#f43f5e", fontWeight: 600 }}>
          ↘ {Math.abs(change).toFixed(2)}%{" "}
          <span style={{ color: "#888", fontWeight: 400 }}>
            from last month.
          </span>
        </span>
      );
    return (
      <span style={{ color: "#888", fontWeight: 600 }}>
        0.00%{" "}
        <span style={{ color: "#888", fontWeight: 400 }}>from last month.</span>
      </span>
    );
  };

  const handleDownloadPDF = async () => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFontSize(18);
    doc.text("Analytics Report", 105, 15, null, null, "center");

    // Capture summary cards
    if (summaryRef.current) {
      const summaryCanvas = await html2canvas(summaryRef.current);
      const imgData = summaryCanvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 25, 190, 40);
    }

    // Capture charts
    if (chartRef.current) {
      const chartCanvas = await html2canvas(chartRef.current);
      const imgData = chartCanvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 70, 190, 200);
    }

    doc.save("Analytics_Report.pdf");
  };

  // Calculate profit for the current accounting period (April 1, 2024 to March 31, 2025)
  let fiscalYearStart, fiscalYearEnd;
  if (now.getMonth() + 1 >= 4) {
    // April or later
    fiscalYearStart = new Date(now.getFullYear(), 3, 1); // April 1
    fiscalYearEnd = new Date(now.getFullYear() + 1, 2, 31); // March 31 next year
  } else {
    fiscalYearStart = new Date(now.getFullYear() - 1, 3, 1); // April 1 last year
    fiscalYearEnd = new Date(now.getFullYear(), 2, 31); // March 31 this year
  }
  // Sum incomes and expenses for the period
  const periodIncomes = monthlyData.reduce((sum, item, idx) => {
    // idx 0 is April, idx 11 is March
    return sum + (item.Incomes || 0);
  }, 0);
  const periodExpenses = monthlyData.reduce((sum, item, idx) => {
    return sum + (item.Expenses || 0);
  }, 0);
  const periodProfit = periodIncomes - periodExpenses;
  const periodLabel = `${fiscalYearStart.getFullYear()}.${(
    fiscalYearStart.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.01 to ${fiscalYearEnd.getFullYear()}.${(
    fiscalYearEnd.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}.31`;

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
          transition: "margin-left 0.3s",
          width: "100%",
        }}
      >
        <div style={{ marginLeft: 0, marginRight: 40 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 32,
            }}
          >
            <h2
              style={{
                fontWeight: 700,
                color: "#222",
                margin: 0,
                marginBottom: 32,
              }}
            >
              Analytics
            </h2>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {/* Summary Cards */}
              <div
                ref={summaryRef}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 32,
                  marginBottom: 32,
                  justifyContent: "center",
                }}
              >
                {/* Average Sales */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    boxShadow: "0 4px 24px #e5e7eb",
                    padding: 32,
                    minWidth: 260,
                    position: "relative",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 24,
                      right: 24,
                      fontSize: 24,
                      color: "#d72660",
                      opacity: 0.8,
                    }}
                  >
                    📅
                  </span>
                  <div style={{ fontSize: 16, color: "#888", marginBottom: 8 }}>
                    Average Sales
                  </div>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#d72660",
                      marginBottom: 8,
                    }}
                  >
                    LKR {averageSales.toLocaleString()}
                  </div>
                  <div
                    style={{ fontSize: 13, color: "#fbb13c", fontWeight: 600 }}
                  >
                    {formatChange(avgSalesChange)}
                  </div>
                </div>
                {/* Total Orders */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    boxShadow: "0 4px 24px #e5e7eb",
                    padding: 32,
                    minWidth: 260,
                    position: "relative",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 24,
                      right: 24,
                      fontSize: 24,
                      color: "#fbb13c",
                      opacity: 0.8,
                    }}
                  >
                    📅
                  </span>
                  <div style={{ fontSize: 16, color: "#888", marginBottom: 8 }}>
                    Total Orders
                  </div>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#fbb13c",
                      marginBottom: 8,
                    }}
                  >
                    LKR {totalIncomes.toLocaleString()}
                  </div>
                  <div
                    style={{ fontSize: 13, color: "#fbb13c", fontWeight: 600 }}
                  >
                    {formatChange(totalOrdersChange)}
                  </div>
                </div>
                {/* Sold Products */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    boxShadow: "0 4px 24px #e5e7eb",
                    padding: 32,
                    minWidth: 260,
                    position: "relative",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 24,
                      right: 24,
                      fontSize: 24,
                      color: "#2ec4b6",
                      opacity: 0.8,
                    }}
                  >
                    💲
                  </span>
                  <div style={{ fontSize: 16, color: "#888", marginBottom: 8 }}>
                    Sold Products
                  </div>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#2ec4b6",
                      marginBottom: 8,
                    }}
                  >
                    {totalSoldProducts.toLocaleString()}
                  </div>
                  <div
                    style={{ fontSize: 13, color: "#fbb13c", fontWeight: 600 }}
                  >
                    {formatChange(soldProductsChange)}
                  </div>
                </div>
                {/* Total Incomes */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    boxShadow: "0 4px 24px #e5e7eb",
                    padding: 32,
                    minWidth: 260,
                    position: "relative",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 24,
                      right: 24,
                      fontSize: 24,
                      color: "#7c3aed",
                      opacity: 0.8,
                    }}
                  >
                    💰
                  </span>
                  <div style={{ fontSize: 16, color: "#888", marginBottom: 8 }}>
                    Total Incomes
                  </div>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#7c3aed",
                      marginBottom: 8,
                    }}
                  >
                    LKR {totalIncomes.toLocaleString()}
                  </div>
                  <div
                    style={{ fontSize: 13, color: "#fbb13c", fontWeight: 600 }}
                  >
                    {formatChange(totalIncomesChange)}
                  </div>
                </div>
                {/* Total Expenses */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    boxShadow: "0 4px 24px #e5e7eb",
                    padding: 32,
                    minWidth: 260,
                    position: "relative",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 24,
                      right: 24,
                      fontSize: 24,
                      color: "#f43f5e",
                      opacity: 0.8,
                    }}
                  >
                    💸
                  </span>
                  <div style={{ fontSize: 16, color: "#888", marginBottom: 8 }}>
                    Total Expenses
                  </div>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#f43f5e",
                      marginBottom: 8,
                    }}
                  >
                    LKR {totalExpenses.toLocaleString()}
                  </div>
                  <div
                    style={{ fontSize: 13, color: "#fbb13c", fontWeight: 600 }}
                  >
                    {formatChange(totalExpensesChange)}
                  </div>
                </div>
                {/* Revenue */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    boxShadow: "0 4px 24px #e5e7eb",
                    padding: 32,
                    minWidth: 260,
                    position: "relative",
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 24,
                      right: 24,
                      fontSize: 24,
                      color: "#10b981",
                      opacity: 0.8,
                    }}
                  >
                    📈
                  </span>
                  <div style={{ fontSize: 16, color: "#888", marginBottom: 8 }}>
                    Revenue
                  </div>
                  <div
                    style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: "#10b981",
                      marginBottom: 8,
                    }}
                  >
                    LKR {revenue.toLocaleString()}
                  </div>
                  <div
                    style={{ fontSize: 13, color: "#fbb13c", fontWeight: 600 }}
                  >
                    {formatChange(revenueChange)}
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
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

              <div
                ref={chartRef}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                  marginBottom: 32,
                }}
              >
                {/* Monthly Incomes vs Expenses Bar Chart */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px #eee",
                    padding: 24,
                  }}
                >
                  <h4 style={{ marginBottom: 24 }}>
                    Monthly Incomes vs Expenses
                  </h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        label={{
                          value: "Month",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Incomes" fill="#d72660" barSize={30} />
                      <Bar dataKey="Expenses" fill="#fbb13c" barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Expense Distribution Pie Chart */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px #eee",
                    padding: 24,
                  }}
                >
                  <h4 style={{ marginBottom: 24 }}>Expense Distribution</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expenseDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {expenseDistribution.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Profit Trend Line Chart */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px #eee",
                    padding: 24,
                  }}
                >
                  <h4 style={{ marginBottom: 24 }}>Profit Trend</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={profitTrend}
                      margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        label={{
                          value: "Month",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Profit"
                        stroke="#2ec4b6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Tax Distribution Pie Chart */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px #eee",
                    padding: 24,
                  }}
                >
                  <h4 style={{ marginBottom: 24 }}>Tax Distribution</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={taxDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent, value }) =>
                          value > 0 && percent > 0.02
                            ? `${name} ${(percent * 100).toFixed(0)}%`
                            : ""
                        }
                      >
                        {taxDistribution.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Top Customers by Income */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px #eee",
                    padding: 24,
                  }}
                >
                  <h4 style={{ marginBottom: 24 }}>Top Customers by Income</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={incomeByCustomer}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#d72660" barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                  {incomeByCustomer.length === 0 && (
                    <div
                      style={{
                        color: "#888",
                        textAlign: "center",
                        marginTop: 16,
                      }}
                    >
                      No customer data available.
                    </div>
                  )}
                </div>

                {/* Monthly Growth Rate */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px #eee",
                    padding: 24,
                  }}
                >
                  <h4 style={{ marginBottom: 24 }}>Monthly Growth Rate</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={monthlyGrowth}
                      margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        label={{
                          value: "Month",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "Growth %",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="Growth"
                        stroke="#e71d36"
                        fill="#e71d36"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Expense Efficiency Trend */}
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px #eee",
                    padding: 24,
                  }}
                >
                  <h4 style={{ marginBottom: 24 }}>Expense Efficiency Trend</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={expenseEfficiency}
                      margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        label={{
                          value: "Month",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "Efficiency %",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Efficiency"
                        stroke="#ff9f1c"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
