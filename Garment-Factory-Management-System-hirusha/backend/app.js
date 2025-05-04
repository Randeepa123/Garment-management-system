const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://hirushathisayuru:hirushathisayuru@accountinganalytics.49rt3.mongodb.net/?retryWrites=true&w=majority&appName=AccountingAnalytics";

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connection Success!");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb Connection Success !");
});

const refundRouter = require("./routes/refundRoute.js");
app.use("/refund", refundRouter);

const receivedRouter = require("./routes/receivedPaymentRoute.js");
app.use("/received", receivedRouter);

const sentRouter = require("./routes/sentPaymentRoute.js");
app.use("/sent", sentRouter);

const budgetRouter = require("./routes/budgetRoute.js");
app.use("/budget", budgetRouter);

const monthlyRouter = require("./routes/monthlyFinanceRoute");
app.use("/monthly", monthlyRouter);

const yearlyRouter = require("./routes/yearlyFinanceRoute");
app.use("/yearly", yearlyRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number :  ${PORT}`);
});
