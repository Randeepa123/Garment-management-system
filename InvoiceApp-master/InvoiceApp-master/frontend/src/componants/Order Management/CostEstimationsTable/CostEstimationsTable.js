import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route,navigate, useNavigate} from 'react-router-dom';

const CostEstimationsTable = () => {
  const [estimates, setEstimates] = useState([]);

  useEffect(() => {
    fetchEstimates();
  }, []);

  const fetchEstimates = async () => {
    try {
      const res = await axios.get('http://localhost:8070/api/costEstApprovedandnoJobcard');
      setEstimates(res.data);
    } catch (error) {
      console.error('Error fetching approved estimates', error);
    }
  };

  const navigate = useNavigate();
  const handleAddOrder = (id) => {    
    console.log("Add Order");
    navigate("/addOrder", { state: { costEstimationId:id} });
  }

  return (
    <div>
      <h2>Approved Cost Estimations</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Product</th>
            <th>Email</th>
            <th>Estimated Dates</th>
            <th>Total Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {estimates.map((est) => (
            <tr key={est._id}>
              <td>{est.productName}</td>
              <td>{est.Email}</td>
              <td>{new Date(est.estimatedStartDate).toDateString()} - {new Date(est.estimatedEndDate).toDateString()}</td>
              <td>{est.totalCostSum}</td>
              <td>
                <button onClick={() => handleAddOrder(est._id)}>Create Jobcard</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CostEstimationsTable;