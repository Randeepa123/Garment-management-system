const express = require("express");
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


const stockRoutes = require("./routes/stockRoutes.js"); 
const purchaseHistoryRoutes = require("./routes/PurchaseHistoryRoutes.js");
const materialRoutes = require("./routes/materialRoutes.js");
const stockLevelRoutes = require("./routes/stockLevelRoutes.js");
const materialCategoryRoutes = require("./routes/materialCategoryRoutes.js");
const stockChartRoutes = require("./routes/StockChartRoute.js"); 

app.use("/api/stock-chart", stockChartRoutes); 
app.use("/api/material-category", materialCategoryRoutes);
app.use("/api/purchase-history", purchaseHistoryRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/stock-levels", stockLevelRoutes);



app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
