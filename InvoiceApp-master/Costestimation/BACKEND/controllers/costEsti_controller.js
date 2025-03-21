const {response} = require('../apps/app_Costestimation');
const CostEstimation = require("../models/costEstiModel");
const mongoose = require("mongoose");

const getAllCostEstimationSheets = (req, res, next) => {
  CostEstimation.find()
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ error });
    });
};

const addCostEstimation = (req, res, next) => {
  const {
    costSheetID,
    productName,
    estimatedStartDate,
    estimatedEndDate,
    costBreakdown,
  } = req.body;

  // Backend validation for security purposes
  if (
    !costSheetID ||
    !productName ||
    !estimatedStartDate ||
    !estimatedEndDate
  ) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided." });
  }

  // Create new cost estimation
  const newCostEstimation = new CostEstimation({
    costSheetID,
    productName,
    estimatedStartDate,
    estimatedEndDate,
    costBreakdown,
  });

  // Save the new cost estimation
  newCostEstimation
    .save()
    .then(() => {
      res.status(201).json("Cost estimation added successfully");
    })
    .catch((error) => {
      console.error("Error saving cost estimation:", error); // log the error in detail
      res
        .status(500)
        .json({ error: error.message || "Error adding cost estimation." });
    });
};

const addCostBreakdown = (costId, breakdownData, callback) => {
  const { description, supplierName, unitType, consumption, costPerUnit } = breakdownData;

  // Validate input fields
  if (!description || !supplierName || !unitType || !consumption || !costPerUnit) {
    return callback({ error: "All fields are required." }, null);
  }

  // Validate costId format (ensure it follows the correct structure, e.g., string or valid object ID)
  if (!costId || typeof costId !== 'string') {
    return callback({ error: "Invalid cost estimation ID." }, null);
  }

  // Find the cost estimation document by costSheetID
  CostEstimation.findOne({ costSheetID: costId })
      .then((costEstimation) => {
          if (!costEstimation) {
              return callback({ error: `Cost Estimation with ID ${costId} not found.` }, null);
          }

          // Calculate total cost for this breakdown
          const totalCost = consumption * costPerUnit;

          // Add new cost breakdown to the costBreakdown array
          costEstimation.costBreakdown.push({
              description,
              supplierName,
              unitType,
              consumption,
              costPerUnit,
              totalCost,
          });

          // Update totalCostSum after adding new breakdown
          costEstimation.totalCostSum = costEstimation.costBreakdown.reduce(
              (sum, breakdown) => sum + breakdown.totalCost,
              0
          );

          // Save updated cost estimation document
          return costEstimation.save();
      })
      .then((updatedCostEstimation) => {
          callback(null, updatedCostEstimation); // Return the updated document via callback
      })
      .catch((error) => {
          console.error("Error in adding cost breakdown:", error);

          // Handle specific CastError if invalid costId format
          if (error.name === 'CastError') {
              return callback({ error: "Invalid cost estimation ID format." }, null);
          }

          // Handle MongoDB-related errors
          if (error.code && error.code === 11000) {
              return callback({ error: "Duplicate cost estimation ID found." }, null);
          }

          // Generic error message
          callback({ error: "Error adding cost breakdown." }, null);
      });
};




const updateCostEstimation = (req, res, next) => {
  const {
    costSheetID,
    productName,
    estimatedStartDate,
    estimatedEndDate,
    costBreakdown,
  } = req.body;

  const updatedCostBreakdown = costBreakdown.map((item) => {
    item.totalCost = item.consumption * item.costPerUnit;
    return item;
  });

  const totalCostSum = updatedCostBreakdown.reduce(
    (sum, item) => sum + item.totalCost,
    0
  );

  CostEstimation.findOneAndUpdate(
    { costSheetID: costSheetID },
    {
      costSheetID,
      productName,
      estimatedStartDate,
      estimatedEndDate,
      costBreakdown: updatedCostBreakdown,
      totalCostSum,
    },
    { new: true }
  )
    .then((response) => {
      if (!response) {
        return res.status(404).json({ error: "Cost estimation not found" });
      }
      res.status(200).json({ message: "Updated successfully", data: response });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};



const deleteCostEstimation = (req, res, next) => {
  const { costSheetID } = req.body;

  if (!costSheetID) {
    return res.status(400).json({ error: "Missing costSheetID" });
  }
  CostEstimation.findOneAndDelete({ costSheetID: costSheetID })
    .then((response) => {
      if (!response) {
        return res.status(404).json({ error: "Cost estimation not found" });
      }
      res.status(200).json({ message: "Cost estimation deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error deleting cost estimation" });
    });
};

const deleteCostBreakdown = async (req, res, next) => {
  try {
    const { costSheetID, breakdownId } = req.body;

    if (!costSheetID || !breakdownId) {
      return res
        .status(400)
        .json({
          error: "Missing costSheetID or breakdownId in the request body",
        });
    }

    const breakdownIdStr = String(breakdownId);

    const updatedCostEstimation = await CostEstimation.findOneAndUpdate(
      { costSheetID: costSheetID },
      { $pull: { costBreakdown: { _id: breakdownIdStr } } },
      { new: true }
    );

    if (!updatedCostEstimation) {
      return res.status(404).json({ error: "Cost estimation not found" });
    }

    updatedCostEstimation.totalCostSum =
      updatedCostEstimation.costBreakdown.reduce(
        (sum, breakdown) => sum + breakdown.totalCost,
        0
      );

    await updatedCostEstimation.save();

    res.status(200).json({
      message: "Cost breakdown deleted successfully",
      data: updatedCostEstimation,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllCostEstimationSheets = getAllCostEstimationSheets;
exports.addCostEstimation = addCostEstimation;
exports.addCostBreakdown = addCostBreakdown;
exports.updateCostEstimation = updateCostEstimation;
exports.deleteCostEstimation = deleteCostEstimation;
exports.deleteCostBreakdown = deleteCostBreakdown;
