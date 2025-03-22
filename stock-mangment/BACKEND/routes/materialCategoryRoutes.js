const express = require("express");
const router = express.Router();
const Material = require("../models/material");
const Stock = require("../models/stock");
const MaterialUsage = require("../models/materialUsage");
const moment = require("moment");

// Get categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Material.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Fetch stock data for a given category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const startDate = moment().startOf("month").toDate();
    const endDate = moment().endOf("month").toDate();

    // Get total stock quantity
    const materials = await Material.find({ category });
    const totalQuantity = materials.reduce((sum, mat) => sum + mat.quantity, 0);

    // Calculate Y-axis interval (divide into 5, round up)
    const yAxisInterval = Math.ceil(totalQuantity / 5);

    // Fetch stock added this month
    const stockAdded = await Stock.aggregate([
      { $match: { category, dateAdded: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: { $dayOfMonth: "$dateAdded" }, totalAdded: { $sum: "$quantity" } } }
    ]);

    // Fetch stock used this month
    const stockUsed = await MaterialUsage.aggregate([
      { $match: { category, dateUsed: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: { $dayOfMonth: "$dateUsed" }, totalUsed: { $sum: "$quantityUsed" } } }
    ]);

    // Format data for 31-day graph
    const chartData = Array.from({ length: 31 }, (_, index) => {
      const day = index + 1;
      return {
        date: `Day ${day}`,
        stockAdded: stockAdded.find(item => item._id === day)?.totalAdded || 0,
        stockUsed: stockUsed.find(item => item._id === day)?.totalUsed || 0
      };
    });

    res.json({ chartData, totalQuantity, yAxisInterval });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
