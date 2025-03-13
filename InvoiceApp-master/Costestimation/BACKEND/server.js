const express = require("express");
const Cost_app = require("./apps/app_Costestimation");  // Import app.js
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routes/costEsti_Router")
require("dotenv").config();



const HOST = process.env.HOST || 'localhost';
const URI = process.env.MONGODB_URI;

// Initialize Express App
const app = express();

const PORT = process.env.PORT || 8070;
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MongoDB Connection
const connect = async () => {
    try {
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB Error:', error);
    }
};

connect();

// Use Routes
app.use('/api', router);


app.listen(PORT, HOST, () => {
    console.log(`Node server is listening on http://${HOST}:${PORT}`);
});
