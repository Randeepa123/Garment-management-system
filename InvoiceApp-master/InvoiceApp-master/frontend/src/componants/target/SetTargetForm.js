import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import CallReceivedOutlinedIcon from "@mui/icons-material/CallReceivedOutlined";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";

import { TargetContex } from "../../contex/TargetContex";

export const SetTargetForm = (props) => {
  const [operators, setoperators] = useState([]);
  const [operation, setOperation] = useState(" ");
  const [operationPg, setOperationPg] = useState();
  const [employeeID, setEmployeeID] = useState(" ");
  const [timeForOperation, setTimeForOperation] = useState();
  const [noOpForHr, setNoOpForHr] = useState();

  const { refresh, setRefresh } = useContext(TargetContex);

  const [key, setKey] = useState(0);

  const SheetNo = props.sheetNum;

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        console.log("Fetching Operators...");
        const response = await axios.get(
          "http://localhost:8070/target/getAllOperators"
        );
        setoperators(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchOperators();
  }, []);

  const newItem = {
    EmployeeId: employeeID,
    Operation: operation,
    Itarget: parseFloat(noOpForHr),
    OperationPg: operationPg,
  };

  const addItemToInvoice = async (e) => {
    if (newItem.OperationPg < 0) {
      return alert("Opereration Per Garment cannot be minus");
    }

    e.preventDefault();
    try {
      console.log("Adding " + refresh + " item to targets...");

      const response = await axios.put(
        `http://localhost:8070/target/addTarget?SheetNo=${SheetNo}`, // URL with query parameter
        newItem, // Request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setRefresh(refresh + 1);
      setKey((prevKey) => prevKey + 1);
      setNoOpForHr(0);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item to Target!");
    }
  };

  const calculateTarget = () => {
    if (timeForOperation < 0) {
      setTimeForOperation(0);
      return alert("Do not enter minus numbers!!");
    }
    const pcs = ((60 / timeForOperation) * 70) / 100;
    setNoOpForHr(pcs);
  };

  return (
    <div key={key} className="col-6 target-form-wrapper p-3">
      <div className="target-form d-flex flex-column justify-content-center">
        <h3>Set Individual Targets</h3>
        <form className="d-flex flex-column justify-content-center">
          <div className="d-flex gap-3 align-items-center m-3">
            <label htmlFor="">Select Operator</label>
            <select
              className="form-select form-select-lg "
              aria-label="Large select example"
              onChange={(e) => setEmployeeID(e.target.value)}
            >
              <option>Open this select menu</option>
              {operators.map((operator) => (
                <option key={operator._id} value={operator._id}>
                  {operator.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex gap-3 align-items-center m-3">
            <label htmlFor="">Operation</label>
            <input
              className="form-control"
              type="text"
              placeholder="ex : Pocket"
              aria-label="default input example"
              onChange={(e) => setOperation(e.target.value)}
            />
          </div>
          <div className="d-flex gap-3 align-items-center m-3">
            <label htmlFor="">Operations Per Garments</label>
            <input
              className="form-control"
              type="Number"
              placeholder="ex : 2"
              aria-label="default input example"
              value={operationPg ? operationPg : null}
              onChange={(e) => setOperationPg(e.target.value)}
            />
          </div>
          <div className="d-flex gap-3 align-items-center m-3">
            <label htmlFor="">Time for 1 operation</label>
            <div className="input-group">
              <input
                className="form-control"
                type="number"
                placeholder="ex : 5"
                aria-label="default input example"
                onChange={(e) => setTimeForOperation(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={calculateTarget}
              >
                <CallReceivedOutlinedIcon sx={{ color: "#007EA4" }} />
                Calculate
              </button>
            </div>
          </div>
          <div className="d-flex gap-3 align-items-center m-3">
            <label htmlFor="">Operations for 1hr</label>
            <input
              className="form-control"
              type="number"
              aria-label="default input example"
              value={noOpForHr}
              onChange={(e) => setNoOpForHr(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary btn-md"
            onClick={addItemToInvoice}
          >
            <ArrowOutwardOutlinedIcon />
            Set Target
          </button>
        </form>
      </div>
    </div>
  );
};
