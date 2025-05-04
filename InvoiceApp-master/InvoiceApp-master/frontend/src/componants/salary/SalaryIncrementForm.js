import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { SalaryContex } from "../../contex/SalaryContex";

export const SalaryIncrementForm = ({ selectedEmployee, selectedAchiver }) => {
  const [topic, setTopic] = useState("Salary Increment");
  const [amount, setAmount] = useState(0);
  const { refresh, setRefresh } = useContext(SalaryContex);

  const year = 2025;
  const month = "May";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inc = {
      employeeId: selectedEmployee.employee._id,
      topic: topic,
      amount: amount,
      year: year,
      month: month,
    };

    try {
      const response = await axios.put(
        "http://localhost:8070/employee/addIncrement",
        inc,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Increment added successfully!");
      setAmount(0); // Reset amount after successful submission
    } catch (error) {
      console.error("Error adding increment:", error);
      alert("Failed to add increment");
    }
    setRefresh((prev) => prev + 1); // Refresh the context to update the salary sheet
  };

  useEffect(() => {
    console.log("Selected Achiver:", selectedAchiver);
    if (selectedAchiver) {
      setTopic("Target Achivement Increment For " + selectedAchiver);
    } else {
      setTopic("Salary Increment");
      setAmount(0);
    }
  }, [selectedAchiver]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="employeeName" className="col-sm-2 col-form-label">
            Employee Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="employeeName"
              value={selectedEmployee ? selectedEmployee.employee.name : ""}
              readOnly
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="position" className="col-sm-2 col-form-label">
            Position
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="position"
              value={selectedEmployee ? selectedEmployee.employee.post : ""}
              readOnly
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="basicSalary" className="col-sm-2 col-form-label">
            Basic Salary
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="basicSalary"
              value={selectedEmployee ? selectedEmployee.employee.basic : ""}
              readOnly
            />
          </div>
        </div>
        <div className="row d-flex mb-3">
          <label htmlFor="increment" className="col-sm-2 col-form-label">
            Increment Amount
          </label>
          <div className="input-group">
            <input
              type="text"
              aria-label="First name"
              className="form-control"
              value={topic}
              readOnly
            />
            <input
              type="number"
              aria-label="Last name"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Increment
        </button>
      </form>
    </div>
  );
};
