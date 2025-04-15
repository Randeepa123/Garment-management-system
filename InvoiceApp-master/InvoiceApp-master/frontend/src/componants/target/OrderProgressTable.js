import React, { useEffect, useState } from "react";
import axios from "axios";

export const OrderProgressTable = () => {
  const [orders, setOrders] = useState([]);
  const [inProgressOrders, setInProgressOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders...");
      const response = await axios.get(`http://localhost:8070/order/orders`);
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const filteredOrders = orders.filter(
      (order) => order.productionTracking.sewing.status === "In-Progress"
    );
    setInProgressOrders(filteredOrders);
  }, [orders]);

  return (
    <div>
      <div class="card flex-fill draggable">
        <div class="card-header">
          <h5 class="card-title mb-0">Latest Projects</h5>
        </div>
        <table class="table table-hover my-0">
          <thead>
            <tr>
              <th>Jobcard ID</th>
              <th class="d-none d-xl-table-cell">Due Date</th>

              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inProgressOrders.map((order) => {
              return (
                <tr>
                  <td>{order.jobcardId}</td>
                  <td class="d-none d-xl-table-cell">01/01/2021</td>

                  <td>
                    <span class="badge bg-success">In-Progress</span>
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
