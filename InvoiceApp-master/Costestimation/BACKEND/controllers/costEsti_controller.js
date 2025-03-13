const {response} = require('../apps/app_Costestimation');
const costEstimation = require('../models/costEstiModel');



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
  const { costSheetID, productName, estimatedStartDate, estimatedEndDate, costBreakdown } = req.body;


  //backend validation for security purpose 
  if (!costSheetID || !productName || !estimatedStartDate || !estimatedEndDate || !Array.isArray(costBreakdown)) {
    return res.status(400).json({ error: "All required fields must be provided, including a cost breakdown array." });
  }

  const newCostEstimation = new costEstimation({
    costSheetID,
    productName,
    estimatedStartDate,
    estimatedEndDate,
    costBreakdown 
  });

  newCostEstimation.save()
    .then(savedCostEstimation => {
      res.status(201).json({ message: "Cost estimation added successfully", data: savedCostEstimation });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
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




