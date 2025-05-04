const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const targetRouter = require("./routes/target");

const processManagement = require("./Process-Management/Backend/router");
const customerRouter = require("./routes/customerRouter");
const invoiceRouter = require("./routes/invoiceRoute");
const router = require("./routes/costEsti_Router");
const EmployeeRouter = require("./routes/employee");
const authRouter = require("./routes/auth");
const stockRouter = require("./StockmanagementBACKEND/routes/StockRoute");


const app = express();
const port = 8070;
const host = "localhost"


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


const server = app.listen(port, host, () => {
  console.log(`Server is listening to http://${host}:${port}`);
});

app.use("/target", targetRouter);
app.use("/employee", EmployeeRouter);
app.use("", processManagement);
app.use("/customer", customerRouter);
app.use("/invoice", invoiceRouter);
app.use ("/api",router)
app.use("/api/stock", stockRouter);

app.use("/auth", authRouter);



app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on http://0.0.0.0:${port}`);
});
