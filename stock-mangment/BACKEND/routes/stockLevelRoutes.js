const express = require("express");
const router = express.Router();
const Material = require("../models/material");

// Category-specific thresholds
const CATEGORY_THRESHOLDS = {
  "Fabrics": 200,
  "Trims & Accessories": 500,
  "Lining & Padding Materials": 300,
  "Decorative & Functional Add-ons": 100,
};

// Route: Get low stock and in-stock items
router.get("/", async (req, res) => {
  try {
    const materials = await Material.find();
    const stockLevels = materials.map(material => {
      const threshold = CATEGORY_THRESHOLDS[material.category] || 0; // Default to 0 if category not found
      const status = material.quantity < threshold ? "Low Stock" : "In Stock";
      return {
        ...material._doc,
        status,
      };
    });
    res.status(200).json(stockLevels);
  } catch (error) {
    console.error("Error fetching stock levels:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;