const express = require("express");
const router = express.Router();
const Material = require("../models/material");
const MaterialUsage = require("../models/materialUsage");

// Get all materials
router.get("/", async (req, res) => {
  try {
    const materials = await Material.find();
    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Use Material (Reduce Quantity & Save to MaterialUsage)
router.post("/use", async (req, res) => {
  try {
    const { category, itemName, quantity, description } = req.body;

    if (!category || !itemName || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const material = await Material.findOne({ itemName });

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    if (material.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Reduce quantity in Material collection
    material.quantity -= quantity;
    await material.save();

    // Save usage record in MaterialUsage collection
    const usageRecord = new MaterialUsage({
      category,
      itemName,
      quantityUsed: quantity,
      description,
    });

    await usageRecord.save();

    res.status(200).json({ message: "Material used successfully", usageRecord });
  } catch (error) {
    console.error("Error in /use route:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all Material Usage History
router.get("/usage", async (req, res) => {
  try {
    const usageRecords = await MaterialUsage.find();
    res.status(200).json(usageRecords);
  } catch (error) {
    console.error("Error fetching material usage:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete Material Usage Record and Update Material Quantity
router.delete("/usage/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find the usage record to be deleted
    const deletedUsage = await MaterialUsage.findById(id);
    if (!deletedUsage) {
      return res.status(404).json({ message: "Usage record not found" });
    }

    // Find the corresponding material and increment its quantity
    const material = await Material.findOne({ itemName: deletedUsage.itemName });
    if (material) {
      material.quantity += deletedUsage.quantityUsed;
      await material.save();
    } else {
      return res.status(404).json({ message: "Material not found" });
    }

    // Delete the usage record
    await MaterialUsage.findByIdAndDelete(id);

    res.status(200).json({ message: "Usage record deleted successfully" });
  } catch (error) {
    console.error("Error deleting material usage record:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;