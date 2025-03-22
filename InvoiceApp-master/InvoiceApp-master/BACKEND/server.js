const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
require("dotenv").config();
const customerRouter = require("./routes/customerRouter.js");
const invoiceRouter = require("./routes/invoiceRoute.js");





const HOST = process.env.HOST || 'localhost';
const URI = process.env.MONGODB_URI;


const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.json()); 
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

const connect = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB Error:', error);
    }
};

connect();



// app.use("/student" , studentRouter);
app.use("/customer", customerRouter);
app.use("/invoice", invoiceRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${HOST}and${PORT}`);
});
