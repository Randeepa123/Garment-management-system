import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AllTargetsTable = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [targetSheets, setTargetSheets] = useState([]);

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders...");
      const response = await axios.get(`http://localhost:8070/orders`);

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchTargets = async () => {
    try {
      console.log("Fetching targets...");
      const response = await axios.get(`http://localhost:8070/target/getAll`);

      setTargetSheets(response.data);
    } catch (error) {
      console.error("Error fetching targets:", error);
    }
  };

  const targetSheetJobcards = new Set(
    targetSheets.map((sheet) => sheet.jobcardId)
  );

  const createTargetSheet = async (jobId, sheetNum) => {
    const newSheet = {
      SheetNo: sheetNum,
      jobcardId: jobId,
    };
    try {
      console.log("Creating target sheet..." + newSheet);

      const response = await axios.post(
        `http://localhost:8070/target/add`, // URL with query parameter
        newSheet, // Request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate(`/set-targets/${sheetNum}`);
    } catch (error) {
      console.error("Error adding Invoice:", error);
      alert("Error adding Invoice");
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchTargets();
  }, []);

  return (
    <div>
      <div className="target-display table-striped py-3 rounded-4">
        <table className="table rounded-4">
          <thead>
            <tr>
              <th scope="col">Jobcard ID</th>
              <th scope="col">Description</th>
              <th scope="col">Proprity</th>
              <th scope="col">Total Quantity</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const shoeButton = !targetSheetJobcards.has(
                String(order.jobcardId)
              );
              const newSheetNo = "T" + order.jobcardId;
              const totalQty = Object.values(order.sizeDistribution).reduce(
                (acc, val) => acc + val,
                0
              );
              return (
                <tr key={order.jobcardId}>
                  <td>{order.jobcardId}</td>
                  <td>{order.description}</td>
                  <td>{order.priority}</td>
                  <td>{totalQty}</td>
                  <td className="d-flex gap-2">
                    {shoeButton ? (
                      <button
                        type="button"
                        class="btn btn-outline-warning btn-rounded"
                        data-mdb-ripple-init
                        data-mdb-ripple-color="dark"
                        onClick={() =>
                          createTargetSheet(order.jobcardId, newSheetNo)
                        }
                      >
                        Create Sheet
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          class="btn btn-outline-info btn-rounded"
                          data-mdb-ripple-init
                          data-mdb-ripple-color="dark"
                          onClick={() =>
                            navigate(`/update-targets/${newSheetNo}`)
                          }
                        >
                          View Sheet
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-success btn-rounded"
                          data-mdb-ripple-init
                          data-mdb-ripple-color="dark"
                          onClick={() => navigate(`/set-targets/${newSheetNo}`)}
                        >
                          Set Targets
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
