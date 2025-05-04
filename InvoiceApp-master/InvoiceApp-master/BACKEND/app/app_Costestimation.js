const express = require("express");
const cors = require("cors");
const Cost_app = express();
const Cost_controller = require("../controllers/costEsti_controller");

Cost_app.use(cors());
Cost_app.use(express.json());
Cost_app.use(express.urlencoded({ extended: true }));

Cost_app.get("/costEstimations", (req, res) => {
  Cost_controller.getAllCostEstimationSheets((error, result) => {
    if (error) {
      return res.status(500).json({ error: "Error fetching cost estimations" });
    }
    res.status(200).json(result);
  });
});

Cost_app.get("/costEstimations/:costSheetID", (req, res) => {
  Cost_controller.getSingleCostEstimationSheet(req, res)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error fetching cost estimation" });
    });
});

Cost_app.post("/cost-estimations", (req, res) => {
  Cost_controller.addCostEstimation(req.body, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Error creating cost estimation" });
    }
    res
      .status(201)
      .json({ message: "Cost estimation created successfully", data: result });
  });
});

// Suggested DELETE endpoint in your backend
Cost_app.delete(
  "/cost-estimations/:costId/cost-breakdown/:breakdownId",
  (req, res) => {
    const { costId, breakdownId } = req.params;

    Cost_controller.deleteCostBreakdown(
      costId,
      breakdownId,
      (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ error: "Error deleting cost breakdown" });
        }
        res
          .status(200)
          .json({
            message: "Cost breakdown deleted successfully",
            data: result,
          });
      }
    );
  }
);

Cost_app.put("/updateCostEstimation", (req, res) => {
  const { id, updateData } = req.body;
  if (!id) {
    return res.status(400).json({ error: "Missing cost estimation ID" });
  }
  Cost_controller.updateCostEstimation(id, updateData, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Error updating cost estimation" });
    }
    res
      .status(200)
      .json({ message: "Cost estimation updated successfully", data: result });
  });
});

Cost_app.delete("/deleteCostEstimation", (req, res) => {
  const { costSheetID } = req.body;

  if (!costSheetID) {
    return res.status(400).json({ error: "Missing costSheetID" });
  }

  Cost_controller.deleteCostEstimation(costSheetID, (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Error deleting cost estimation" });
    }
    res
      .status(200)
      .json({ message: "Cost estimation deleted successfully", data: result });
  });
});

Cost_app.delete("/deleteCostEstimationBreakdown", async (req, res) => {
  try {
    const { costSheetID, breakdownId } = req.body;

    if (!costSheetID || !breakdownId) {
      return res.status(400).json({ error: "Missing required IDs" });
    }

    const updatedCostEstimation = await Cost_controller.deleteCostBreakdown(
      costSheetID,
      breakdownId
    );

    if (!updatedCostEstimation) {
      return res.status(404).json({ error: "Cost estimation not found" });
    }
    res
      .status(200)
      .json({
        message: "Cost breakdown deleted successfully",
        data: updatedCostEstimation,
      });
  } catch (error) {
    res.status(500).json({ error: "Error deleting cost breakdown" });
  }
});

module.exports = Cost_app;
