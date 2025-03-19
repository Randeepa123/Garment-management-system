import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";

export const UpdateTargetForm = () => {
  const [employeeID, setEmployeeID] = useState(" ");
  const SheetNo = "TS001";
  const [targets, setTargets] = useState([]);
  const [operators, setOperators] = useState([]);
  const [operator, setOperator] = useState();

  const fetchOperators = () => {
    const ops = [];
    targets.map((target) => {
      ops.push(target.EmployeeId);
    });

    const uops = ops.filter(function (item, index) {
      return (
        index ===
        ops.findIndex(function (obj) {
          return item._id === obj._id;
        })
      );
    });

    console.log("op", ops);
    setOperators(uops);
  };

  const fetchOperations = (operator) => {};

  const fetchTargets = async () => {
    try {
      console.log("Fetching Targets...");
      const response = await axios.get(
        `http://localhost:8070/target/getSheet?SheetNo=${SheetNo}`
      );
      setTargets(response.data);
    } catch (error) {
      console.error("Error fetching targets:", error);
    }
  };

  useEffect(() => {
    fetchTargets();
  }, []);

  useEffect(() => {
    fetchOperators();
  }, [targets]);

  return (
    <div className="p-3 d-flex flex-column gap-3">
      <div class="form-floating">
        <select
          class="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
          onChange={(e) => setEmployeeID(e.target.value)}
        >
          <option selected>Open this select menu</option>
          {operators.map((operator) => (
            <option key={operator._id} value={operator._id}>
              {operator.name}
            </option>
          ))}
        </select>
        <label for="floatingSelect">Select Operator</label>
      </div>
      <div class="form-floating">
        <select
          class="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
        >
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <label for="floatingSelect">Select Operation</label>
      </div>
      <div class="form-floating">
        <select
          class="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
        >
          <option selected>Open this select menu</option>
          {[...Array(10)].map((_, i) => (
            <option value={8 + i}>{`${8 + i}:15 - ${9 + i}:15`}</option>
          ))}
        </select>
        <label for="floatingSelect">Hour</label>
      </div>

      <div className="d-flex justify-content-between gap-2 px-2">
        <lable>No of Pcs: </lable>
        <input
          className="form-control"
          type="number"
          placeholder="ex : Pocket"
          aria-label="default input example"
        />
      </div>
      <button type="button" class="w-50 btn btn-primary btn-md">
        <ArrowOutwardOutlinedIcon />
        Set Target
      </button>
    </div>
  );
};
