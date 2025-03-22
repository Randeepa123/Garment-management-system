import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UpdateTargetContex } from "../../contex/UpdateTargetContex";

export const UpdateTargetTable = (props) => {
  const { refresh, setRefresh } = useContext(UpdateTargetContex);
  const SheetNo = props.sheetNum;
  const [targets, setTargets] = useState([]);

  const fetchTargets = async () => {
    try {
      console.log("Fetching Targets...");
      const response = await axios.get(
        `http://localhost:8070/target/getSheet?SheetNo=${SheetNo}`
      );
      setTargets(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchTargets();
  }, [refresh]);

  useEffect(() => {
    console.log(targets);
  }, [targets]);
  return (
    <div className=" target-update table-striped p-4">
      <table className="table rounded">
        <thead>
          <tr>
            <th scope="col">Operation</th>
            <th scope="col">X</th>
            <th scope="col" className="noWrapping">
              Hour Target
            </th>
            <th scope="col">Operator</th>
            {[...Array(10)].map((_, i) => (
              <th key={i}>{`${8 + i}:15 - ${9 + i}:15`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {targets.map((target) => (
            <tr key={`${target.EmployeeId._id}-${target.Operation}`}>
              <td>{target.EmployeeId.name}</td>
              <td>18</td>
              <td>{target.Operation}</td>
              <td>{target.ITarget}</td>
              {[...Array(10)].map((_, i) => (
                <td key={`${target.EmployeeId._id}-${i}`}>
                  {target.IOuts[i] ? target.IOuts[i] : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
