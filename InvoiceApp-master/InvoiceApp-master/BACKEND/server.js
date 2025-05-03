const express = require("express");
const app = express();
const cors = require("cors");
const port = 8070;
const host = "0.0.0.0";  
const mongoose = require("mongoose");
require("dotenv").config();
const targetRouter = require("./routes/target");

const processManagement = require("./Process-Management/Backend/router");
const customerRouter = require("./routes/customerRouter");
const invoiceRouter = require("./routes/invoiceRoute");
const router = require("./routes/costEsti_Router");
//ishan
const stockRouter = require("./StockmanagementBACKEND/routes/StockRoute");

app.use(cors());
app.use(express.json());

const DbUrl = process.env.mongodb_uri;

const connect = async () => {
  try {
    await mongoose.connect(DbUrl);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
};

connect();

// Listen on all network interfaces (0.0.0.0)
const server = app.listen(port, host, () => {
  console.log(`Server is listening to http://${host}:${port}`);
});

app.use("/target", targetRouter);
app.use("", processManagement);
app.use("/customer", customerRouter);
app.use("/invoice", invoiceRouter);
app.use("/api", router);
//ishan
app.use("/api/stock", stockRouter);
