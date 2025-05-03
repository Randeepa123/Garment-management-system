import React, { useState, useEffect } from "react";
import axios from "axios";

export const SalaryTable = ({ onSelectEmployee }) => {
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const currentDate = new Date();
        const month = getMonthName(currentDate);
        const year = currentDate.getFullYear();

        console.log("Salary data:", month, year);

        const response = await axios.get(
          `http://localhost:8070/employee/getSalarySheet`,
          {
            params: { month, year },
          }
        );
        console.log("Salary data:", response.data);
        setSalaryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching salary data:", error);
        setLoading(false);
      }
    };

    fetchSalaryData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const calculateTotalSalary = (basic, increments) => {
    if (!increments) return basic;
    return basic + increments.reduce((sum, inc) => sum + inc.amount, 0);
  };

  const handleViewDetails = (employee) => {
    console.log("Selected employee:", employee);
    onSelectEmployee(employee);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Position</th>
            <th scope="col">Basic (Rs.)</th>
            <th scope="col">Total Salary (Rs.)</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {salaryData.map((employee, index) => (
            <tr key={employee.employee._id}>
              <th scope="row">{index + 1}</th>
              <td>{employee.employee.name}</td>
              <td>{employee.employee.post}</td>
              <td>{employee.employee.basic}</td>
              <td>
                {calculateTotalSalary(
                  employee.employee.basic,
                  employee.increments
                )}
              </td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleViewDetails(employee)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
