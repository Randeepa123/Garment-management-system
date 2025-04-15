const express = require("express");
const cors = require("cors");
const Invoice_app = express();
const Invoice_controller = require("../controllers/Invoice_controller");

// Middleware
Invoice_app.use(cors());
Invoice_app.use(express.json());
Invoice_app.use(express.urlencoded({ extended: true }));

// Invoice Routes
Invoice_app.post("/add", async (req, res, next) => {
  try {
    Invoice_controller.addInvoice(req, res, next);
  } catch (error) {
    console.error("Error adding invoice:", error);
    res.status(500).json({ error: "Error adding invoice" });
  }
});

Invoice_app.get("/getAll", async (req, res, next) => {
  try {
    await Invoice_controller.getAllInvoices(req, res, next);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Error fetching invoices" });
  }
});

Invoice_app.get("/getInvoice/:invoiceId", async (req, res, next) => {
  try {
    Invoice_controller.getInvoice(req, res, next);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ error: "Error fetching invoice" });
  }
});

Invoice_app.put("/addItem", async (req, res, next) => {
  try {
    Invoice_controller.addItemToInvoice(req, res, next);
  } catch (error) {
    console.error("Error adding item to invoice:", error);
    res.status(500).json({ error: "Error adding item" });
  }
});

Invoice_app.delete("/deleteItem", async (req, res, next) => {
  try {
    Invoice_controller.deleteItemFromInvoice(req, res, next);
  } catch (error) {
    console.error("Error deleting item from invoice:", error);
    res.status(500).json({ error: "Error deleting item" });
  }
});

Invoice_app.put("/updateItem", async (req, res, next) => {
  try {
    Invoice_controller.updateItemInInvoice(req, res, next);
  } catch (error) {
    console.error("Error updating invoice item:", error);
    res.status(500).json({ error: "Error updating item" });
  }
});

module.exports = Invoice_app;
