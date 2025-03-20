import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TargetContex } from "../../contex/TargetContex";

export const TargetTable = () => {
  const SheetNo = "S003";
  const [targets, setTargets] = useState([]);
  const { refresh, setRefresh } = useContext(TargetContex);

  useEffect(() => {
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

    fetchTargets();
  }, [refresh]);

  return (
    <div className="col-6 target-display table-striped p-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Operation</th>
            <th scope="col">Operatoer</th>
            <th scope="col">Hour Target</th>
          </tr>
        </thead>
        <tbody>
          {targets.map((target) => (
            <tr key={target._id}>
              <td>{target.EmployeeId.name}</td>
              <td>{target.Operation}</td>
              <td>{target.ITarget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
