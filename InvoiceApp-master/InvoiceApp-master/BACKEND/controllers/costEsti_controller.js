const {response} = require('../app/app_Costestimation');
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

const getSingleCostEstimationSheet = (req, res,next) => {
  const { costSheetID } = req.params;

  if (!costSheetID) {
    return res.status(400).json({ error: "Missing costSheetID" });
  }

  CostEstimation.findOne({ costSheetID })
    .then((costEstimation) => {
      if (!costEstimation) {
        return res.status(404).json({ error: "Cost estimation not found" });
      }
      res.status(200).json({ data: costEstimation });
    })
    .catch((error) => {
      console.error("Error fetching cost estimation:", error);
      res.status(500).json({ error: "Server error while fetching cost estimation" });
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


const addCostBreakdown = async (req, res) => {
  try {
    const { costId } = req.params;
    const { costBreakdown } = req.body;

    if (!costId) {
      return res.status(400).json({ error: "Cost Sheet ID is required" });
    }

    if (!costBreakdown || !Array.isArray(costBreakdown)) {
      return res.status(400).json({ error: "Invalid cost breakdown data" });
    }

    const costEstimation = await CostEstimation.findOne({ costSheetID: costId });

    if (!costEstimation) {
      return res.status(404).json({ error: "Cost Sheet not found" });
    }

    costBreakdown.forEach((breakdown) => {
      costEstimation.costBreakdown.push({
        description: breakdown.description,
        supplierName: breakdown.supplierName,
        unitType: breakdown.unitType,
        consumption: breakdown.consumption,
        costPerUnit: breakdown.costPerUnit,
        totalCost: breakdown.consumption * breakdown.costPerUnit,
      });
    });

    await costEstimation.save();

    res.status(201).json({ message: "Cost breakdown added successfully", updatedCostEstimation: costEstimation });
  } catch (error) {
    console.error("Error adding cost breakdown:", error);
    res.status(500).json({ error: "Server error while adding cost breakdown" });
  }
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
exports.getSingleCostEstimationSheet = getSingleCostEstimationSheet;
exports.addCostEstimation = addCostEstimation;
exports.addCostBreakdown = addCostBreakdown;
exports.updateCostEstimation = updateCostEstimation;
exports.deleteCostEstimation = deleteCostEstimation;
exports.deleteCostBreakdown = deleteCostBreakdown;
