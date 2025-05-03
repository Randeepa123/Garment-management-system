const express = require("express");
const app = express();
const cors = require("cors");
const port = 8070;
const host = "localhost";
const mongoose = require("mongoose");
require("dotenv").config();
const targetRouter = require("./routes/target");

const processManagement = require("./Process-Management/Backend/router");
const customerRouter = require("./routes/customerRouter");
const invoiceRouter = require("./routes/invoiceRoute");
const router = require("./routes/costEsti_Router");
const EmployeeRouter = require("./routes/employee");

app.use(cors());
app.use(express.json());

const DbUrl = process.env.MONGODB_URI;

const connect = async () => {
  try {
    await mongoose.connect(DbUrl);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
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
app.use("/api", router);

/*const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongoose connection success!");
});

// const studentRouter = require("./routes/students.js");
const customerRouter = require("./routes/customer.js");
const invoiceRouter = require("./routes/invoice.js");
const targetRouter = require("./routes/target.js");
const employeeRouter = require("./routes/employee.js");

// app.use("/student" , studentRouter);
app.use("/customer", customerRouter);
app.use("/invoice", invoiceRouter);
app.use("/target", targetRouter);
app.use("/employee", employeeRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});*/
