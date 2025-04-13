import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TargetContex } from "../../contex/TargetContex";
import Box from "@mui/material/Box";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
function CircleIconBox({ icon, color = "#FF0000", pwidth = 40 }) {
  return (
    <Box
      sx={{
        backgroundColor: color,
        width: pwidth,
        height: pwidth,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icon}
    </Box>
  );
}

export const TargetTable = (props) => {
  const SheetNo = props.sheetNum;
  const [targets, setTargets] = useState([]);
  const { refresh, setRefresh } = useContext(TargetContex);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        console.log("Fetching Targets...");
        const response = await axios.get(
          `http://localhost:8070/target/getSheet?SheetNo=${SheetNo}`
        );
        console.log(response.data);
        setTargets(response.data);
      } catch (error) {
        console.error("Error fetching targets:", error);
      }
    };

    fetchTargets();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      console.log("deleting " + id + " target...");

      const response = await axios.delete(
        `http://localhost:8070/target/deleteTarget?objId=${id}` // URL with query parameter
      );
      setRefresh(refresh + 1);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item to invoice!");
    }
  };

  return (
    <div key={key} className="col-6 target-display table-striped p-4">
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

              <td>
                <a href="#" onClick={() => handleDelete(target._id)}>
                  <CircleIconBox
                    icon={
                      <DeleteOutlineOutlinedIcon
                        sx={{ color: "white", width: 12, height: 12 }}
                        pwidth={20}
                      />
                    }
                    pwidth={20}
                  />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
