const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const costEstimationSchema = new Schema({
  costSheetID: {
    type: String,
    required: false,
    unique: true, 
  },
  productName: {
    type: String,
    required: true, 
  },
  Email: {
    type: String,
    required: true, 
  },
  jobcardCreated: {
    type: Boolean,
    default: false
  },
  estimatedStartDate: {
    type: Date,
    required: true, 
  },
  estimatedEndDate: {
    type: Date,
    required: true,
  },
  costBreakdown: [
    {
      description: { type: String, required: true }, 
      supplierName: { type: String, required: true }, 
      unitType: { type: String, required: true }, 
      consumption: { type: Number, required: true }, 
      costPerUnit: { type: Number, required: true }, 
      totalCost: { 
        type: Number, 
        required: true, 
        default: function() {
          return this.consumption * this.costPerUnit; 
        }
      }, 
    },
  ],
  totalCostSum: {
    type: Number,
    default: 0, 
  },
  isApproved: {
    type: Boolean,
    default: null, // null = pending, true = approved, false = declined
  },
  date: {
    type: Date,
    default: Date.now, 
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
