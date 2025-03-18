import React, { useState } from "react";
import { Box, Button, TextField, Typography, Divider } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const CostEstiPrimaryData = () => {
  const [costData, setCostData] = useState({
    title: "",
    materialsCost: 0,
    laborCost: 0,
    otherExpenses: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCostData({ ...costData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Cost Data:", costData);
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "5px",
      }}
    >
      <Box sx={{ flex: 1, paddingRight: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            marginBottom: "30px",
            marginTop: "-40px",
            whiteSpace: "nowrap",
          }}
        >
          <ControlPointIcon sx={{ marginRight: "10px" }} />
          Create New Cost-Estimation
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginTop: "20px",
            }}
          >
            <TextField
              label="CostSheet ID"
              name="title"
              value={costData.title}
              onChange={handleInputChange}
              variant="outlined"
              required
            />

            <TextField
              label="Product Name"
              name="materialsCost"
              value={costData.materialsCost}
              onChange={handleInputChange}
              variant="outlined"
              required
            />

            <TextField
              label="Estimated Start-Date"
              name="laborCost"
              value={costData.laborCost}
              onChange={handleInputChange}
              variant="outlined"
              type="Date"
              required
            />

            <TextField
              label="Estimated End-Date"
              name="otherExpenses"
              value={costData.otherExpenses}
              onChange={handleInputChange}
              variant="outlined"
              type="Date"
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              ADD
            </Button>
          </Box>
        </form>
      </Box>

    </Box>
  );
};

export default CostEstiPrimaryData;
