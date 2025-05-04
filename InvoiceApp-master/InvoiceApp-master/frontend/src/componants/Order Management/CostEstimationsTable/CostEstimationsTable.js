import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route,navigate, useNavigate} from 'react-router-dom';

const CostEstimationsTable = () => {

  
  const thStyle = {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd'
  };
  
  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #eee'
  };



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
    <div
    style={{
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      marginTop: '2rem'
    }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Approved Cost Estimations</h2>
      <table border="1"
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#fff',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <thead style={{ backgroundColor: '#007bff', color: 'white' }}>
          <tr>
            <th style={thStyle}>Product</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Estimated Dates</th>
            <th style={thStyle}>Total Cost</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {estimates.map((est) => (
            <tr key={est._id} style={{ textAlign: 'center' }}>
              <td style={tdStyle}>{est.productName}</td>
              <td style={tdStyle}>{est.Email}</td>
              <td style={tdStyle}>{new Date(est.estimatedStartDate).toDateString()} - {new Date(est.estimatedEndDate).toDateString()}</td>
              <td style={tdStyle}>RS.{est.totalCostSum}</td>
              <td>
                <button onClick={() => handleAddOrder(est._id)}
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                  >Create Jobcard</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CostEstimationsTable;