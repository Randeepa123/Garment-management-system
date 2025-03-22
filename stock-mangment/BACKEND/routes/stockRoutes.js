const express = require("express");
const router = express.Router();
const Stock = require("../models/stock");
const Material = require("../models/material");

router.post("/add", async (req, res) => {
  try {
    const { itemName, category, quantity, price, supplier } = req.body;

    if (!itemName || !category || !quantity || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if material exists in Material collection
    let material = await Material.findOne({ itemName });

    if (material) {
      // Update the existing material quantity
      material.quantity += Number(quantity);
      await material.save();
    } else {
      // Add new material to the Material collection
      material = new Material({ category, itemName, quantity });
      await material.save();
    }

    // Save the stock record
    const newStock = new Stock({ itemName, category, quantity, price, supplier });
    await newStock.save();

    res.status(201).json({ message: "Stock added successfully", stock: newStock, material });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
