const express = require("express");
const router = express.Router();
const Stock = require("../models/stock");

// Add stock endpoint (POST /api/stock/add)
router.post("/add", async (req, res) => {
  try {
    const { itemName, category, quantity, price, supplier } = req.body;

    if (!itemName || !category || !quantity || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newStock = new Stock({ itemName, category, quantity, price, supplier });
    await newStock.save();

    res.status(201).json({ message: "Stock added successfully", stock: newStock });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
