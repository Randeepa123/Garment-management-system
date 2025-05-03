const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 8070;

// Import routers
const targetRouter = require("./routes/target");
const processManagement = require("./Process-Management/Backend/router");
const customerRouter = require("./routes/customerRouter");
const invoiceRouter = require("./routes/invoiceRoute");
const router = require("./routes/costEsti_Router");
const employeeRouter = require("./routes/employee");
const stockRouter = require("./StockmanagementBACKEND/routes/StockRoute");

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const dbUrl = process.env.MONGODB_URL;
const connect = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to DB");
  } catch (err) {
    console.error("DB Connection Error:", err);
  }
};
connect();

// Register routes
app.use("/target", targetRouter);
app.use("/employee", employeeRouter);
app.use("", processManagement);
app.use("/customer", customerRouter);
app.use("/invoice", invoiceRouter);
app.use("/api", router);
app.use("/api/stock", stockRouter);

// Start server (bind to all interfaces, not just localhost)
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on http://0.0.0.0:${port}`);
});
