const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const costEstimationSchema = new Schema({
  costSheetID: {
    type: String,
    required: true,
    unique: true, // Ensures unique cost sheet ID
  },
  productName: {
    type: String,
    required: true, // Name of the product being estimated
  },
  estimatedStartDate: {
    type: Date,
    required: true, // Start date of the estimation period
  },
  estimatedEndDate: {
    type: Date,
    required: true, // End date of the estimation period
  },
  costBreakdown: [
    {
      description: { type: String, required: true }, // Description of the cost
      supplierName: { type: String, required: true }, // Supplier for the item
      unitType: { type: String, required: true }, // Unit type (e.g., kg, hour)
      consumption: { type: Number, required: true }, // Quantity of units consumed
      costPerUnit: { type: Number, required: true }, // Cost per unit
      totalCost: { 
        type: Number, 
        required: true, 
        default: function() {
          return this.consumption * this.costPerUnit; // Automatically calculate total cost
        }
      }, // Total cost calculated automatically
    },
  ],
  totalCostSum: {
    type: Number,
    default: 0, // Default total cost sum is 0
  },
  date: {
    type: Date,
    default: Date.now, // Default to the current date when creating the document
  },
});

// Pre-save middleware to calculate totalCostSum before saving the document
costEstimationSchema.pre('save', function(next) {
  // Calculate total sum by reducing costBreakdown array
  this.totalCostSum = this.costBreakdown.reduce(
    (sum, breakdown) => sum + breakdown.totalCost,
    0
  );
  next(); // Proceed to save the document
});

// Creating the CostEstimation model
const CostEstimation = mongoose.model('CostEstimation', costEstimationSchema);

module.exports = CostEstimation;
