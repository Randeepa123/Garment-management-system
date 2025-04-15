import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import { UpdateTargetContex } from "../../contex/UpdateTargetContex";

export const UpdateTargetForm = (props) => {
  const SheetNo = props.sheetNum;
  const [targets, setTargets] = useState([]);
  const [operators, setOperators] = useState([]);
  const [operations, setOprations] = useState([]);
  const [operator, setOperator] = useState();
  const [oper, setOper] = useState();
  const [numOfPcs, setNumOfPcs] = useState();
  const [timeIndex, setTimeIndex] = useState();

  const { refresh, setRefresh } = useContext(UpdateTargetContex);

  const load = () => {
    setRefresh(refresh + 1);
  };

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

    setOperators(uops);
  };

  const fetchOperations = (opId) => {
    setOprations([]);
    setOperator(opId);

    const oprs = [];
    targets.map((target) => {
      if (target.EmployeeId._id == opId) {
        oprs.push(target.Operation);
      }
    });

    setOprations(oprs);
  };

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

  const newItem = {
    time: parseInt(timeIndex),
    quantity: parseInt(numOfPcs),
  };

  const updatetargets = async (e) => {
    e.preventDefault();
    if (numOfPcs < 0) {
      return alert("Do not enter minus values for Number of pcs");
    }
    try {
      console.log("Updating Target!!");
      const response = await axios.put(
        `http://localhost:8070/target/updateTarget?SheetNo=${SheetNo}&Operation=${oper}&EmployeeId=${operator}`,
        newItem, // Request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      load();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add Targets to sheet!");
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
          onChange={(e) => fetchOperations(e.target.value)}
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
          onChange={(e) => setOper(e.target.value)}
        >
          <option selected>Open this select menu</option>
          {operations.map((operation) => (
            <option key={operation} value={operation}>
              {operation}
            </option>
          ))}
        </select>
        <label for="floatingSelect">Select Operation</label>
      </div>
      <div class="form-floating">
        <select
          class="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
          onChange={(e) => setTimeIndex(e.target.value)}
        >
          <option selected>Open this select menu</option>
          {[...Array(10)].map((_, i) => (
            <option value={i}>{`${8 + i}:15 - ${9 + i}:15`}</option>
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
          onChange={(e) => setNumOfPcs(e.target.value)}
        />
      </div>
      <button
        type="button"
        class="w-50 btn btn-primary btn-md"
        onClick={(e) => updatetargets(e)}
      >
        <ArrowOutwardOutlinedIcon />
        Set Target
      </button>
    </div>
  );
};
