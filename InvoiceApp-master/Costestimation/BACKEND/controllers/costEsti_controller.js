const {response} = require('../apps/app_Costestimation');
const costEstimation = require('../models/costEstiModel');
const mongoose = require("mongoose");



const getAllCostEstimationSheets = (req,res,next) => {
    costEstimation.find()
        .then(response =>{
          res.json({response})
        })
        .catch(error => {
            res.json({error})
        })

};



const addCostEstimation = (req, res, next) => {
  const { 
    costSheetID,
    productName,
    estimatedStartDate, 
    estimatedEndDate ,
    costBreakdown } = req.body;

  // Backend validation for security purposes
  if (!costSheetID || !productName || !estimatedStartDate || !estimatedEndDate) {
    return res.status(400).json({ error: "All required fields must be provided." });
  }

  // Create new cost estimation
  const newCostEstimation = new costEstimation({
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
      res.status(201).json( "Cost estimation added successfully" );
    })
    .catch(error => {
      console.error("Error in adding cost estimation:", error);
      res.status(500).json({ error: "Error adding cost estimation." });
    });
}


const addCostBreakdown = async (req, res, next) => {
  try {
      const { costEstimationId, description, supplierName, unitType, consumption, costPerUnit } = req.body; 

      if (!costEstimationId || !description || !supplierName || !unitType || !consumption || !costPerUnit) {
          return res.status(400).json({ error: "All fields are required." });
      }

      const costEstimation = await costEstimation.findOne({ costSheetID: costEstimationId });
      if (!costEstimation) {
          return res.status(404).json({ error: "Cost Estimation not found." });
      }

      const totalCost = consumption * costPerUnit;

      costEstimation.costBreakdown.push({
          description,
          supplierName,
          unitType,
          consumption,
          costPerUnit,
          totalCost,
      });

      costEstimation.totalCostSum = costEstimation.costBreakdown.reduce((sum, breakdown) => sum + breakdown.totalCost, 0);

      const updatedCostEstimation = await costEstimation.save();

      res.status(200).json({
        message: "Cost breakdown added successfully",
        data: updatedCostEstimation
      });
  } catch (error) {
      console.error("Error in adding cost breakdown:", error);
      res.status(500).json({ error: "Error adding cost breakdown." });
  }
};





const updateCostEstimation = (req, res, next) => {
  const { costSheetID, productName, estimatedStartDate, estimatedEndDate, costBreakdown } = req.body;

  // Recalculate totalCost for each breakdown item
  const updatedCostBreakdown = costBreakdown.map(item => {
    item.totalCost = item.consumption * item.costPerUnit;  // Recalculate totalCost
    return item;
  });

  // Calculate total cost sum after recalculation of breakdowns
  const totalCostSum = updatedCostBreakdown.reduce((sum, item) => sum + item.totalCost, 0);

  // Update cost estimation based on costSheetID
  costEstimation.findOneAndUpdate(
    { costSheetID: costSheetID },  // Use costSheetID in the query
    { 
      costSheetID, 
      productName, 
      estimatedStartDate, 
      estimatedEndDate, 
      costBreakdown: updatedCostBreakdown, 
      totalCostSum 
    }, 
    { new: true }  // Return the updated document
  )
    .then(response => {
      if (!response) {
        return res.status(404).json({ error: "Cost estimation not found" });
      }
      res.status(200).json({ message: "Updated successfully", data: response });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
};




const deleteCostEstimation = (req, res, next) => {
  const { costSheetID } = req.body;  

  if (!costSheetID) {
      return res.status(400).json({ error: "Missing costSheetID" });  
  }
  costEstimation.findOneAndDelete({ costSheetID: costSheetID })
      .then(response => {
          if (!response) {
              return res.status(404).json({ error: "Cost estimation not found" });
          }
          res.status(200).json({ message: "Cost estimation deleted successfully" });
      })
      .catch(error => {
          res.status(500).json({ error: "Error deleting cost estimation" });
      });
};



const deleteCostBreakdown = async (req, res, next) => {
  try {
    const { costSheetID, breakdownId } = req.body;

    // Check if both costSheetID and breakdownId are provided
    if (!costSheetID || !breakdownId) {
      return res.status(400).json({ error: "Missing costSheetID or breakdownId in the request body" });
    }

    // Ensure breakdownId is a string, which matches the model definition
    const breakdownIdStr = String(breakdownId);

    // Find and update the cost estimation, pulling the breakdown item using breakdownId
    const updatedCostEstimation = await costEstimation.findOneAndUpdate(
      { costSheetID: costSheetID }, // Use costSheetID in the query
      { $pull: { costBreakdown: { _id: breakdownIdStr } } }, // Use breakdownId as string
      { new: true } // Ensures the updated document is returned
    );

    // If the cost estimation is not found, return a 404 error
    if (!updatedCostEstimation) {
      return res.status(404).json({ error: "Cost estimation not found" });
    }

    // Recalculate totalCostSum after deletion of the breakdown
    updatedCostEstimation.totalCostSum = updatedCostEstimation.costBreakdown.reduce(
      (sum, breakdown) => sum + breakdown.totalCost, 0
    );

    // Save the updated cost estimation with the new totalCostSum
    await updatedCostEstimation.save();

    // Send success response
    res.status(200).json({
      message: "Cost breakdown deleted successfully",
      data: updatedCostEstimation
    });
  } catch (error) {
    // If there's an error, send a 500 response with error message
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.getAllCostEstimationSheets = getAllCostEstimationSheets;
exports.addCostEstimation = addCostEstimation;
exports.updateCostEstimation = updateCostEstimation;
exports.deleteCostEstimation = deleteCostEstimation;
exports.deleteCostBreakdown = deleteCostBreakdown;
exports.addCostBreakdown = addCostBreakdown;




