const express = require("express");
const router = express.Router();
const Stock = require("../models/stock");
const Material = require("../models/material");

// Get recent stocks with optional date filtering
router.get("/recent", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = {};

    if (startDate && endDate) {
      query.dateAdded = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const recentStocks = await Stock.find(query).sort({ dateAdded: -1 });
    res.status(200).json(recentStocks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Remove stock item and update material quantity
router.delete("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { itemName, category, quantity } = req.body;

    // Remove stock entry
    const deletedStock = await Stock.findByIdAndDelete(id);
    if (!deletedStock) {
      return res.status(404).json({ message: "Stock item not found" });
    }

    // Update material quantity
    const material = await Material.findOne({ itemName, category });
    if (material) {
      material.quantity -= quantity;
      await material.save();
    }

    res.status(200).json({ message: "Stock item removed and material updated" });
  } catch (error) {
    res.status(500).json({ message: "Error removing stock item", error });
  }
});

module.exports = router;
