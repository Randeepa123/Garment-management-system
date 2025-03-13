const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const costBreakdownSchema = new Schema({
    _id: { type: String, required: true },
    description: { type: String, required: true },
    supplierName: { type: String, required: true },
    unitType: { type: String, required: true },
    consumption: { type: Number, required: true },
    costPerUnit: { type: Number, required: true },
    totalCost: {  type: Number, 
        default: function() {
            return this.consumption * this.costPerUnit; 
        }
    }
});


const costEstimationSchema = new Schema({
    costSheetID: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    estimatedStartDate: { type: Date, required: true },
    estimatedEndDate: { type: Date, required: true },
    costBreakdown: [costBreakdownSchema], 
    totalCostSum: { type: Number, default: 0 }
}, { timestamps: true });


// Pre-save middleware to calculate totalCostSum before saving the document
costEstimationSchema.pre('save', function(next) {
    // Calculate the totalCostSum by summing the totalCost of all breakdowns
    this.totalCostSum = this.costBreakdown.reduce((sum, breakdown) => sum + breakdown.totalCost, 0);
    next();
});

const costEstimation = mongoose.model('CostEstimation', costEstimationSchema);

module.exports = costEstimation;
