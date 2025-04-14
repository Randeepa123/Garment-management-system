const express = require("express");
const cors = require("cors");
const customer_app = express();
const CustomerController = require("../controllers/customer_controller");

// Middleware
customer_app.use(cors());
customer_app.use(express.json());
customer_app.use(express.urlencoded({ extended: true }));

// Routes
customer_app.post("/add", async (req, res, next) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.phone || !req.body.address) {
            return res.status(400).json({ error: "All fields are required" });
        }
        await CustomerController.addCustomer(req, res, next);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

customer_app.get("/getAll", async (req, res, next) => {
    try {
        await CustomerController.getAllCustomers(req, res, next);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = customer_app;
