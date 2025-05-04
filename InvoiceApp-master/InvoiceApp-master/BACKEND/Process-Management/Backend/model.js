const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const autoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema=new Schema({
  costEstimationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CostEstimation',
    required: true
  },

  orderDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
  customer: { type: String, required: true },
  priority: { 
    type: String, 
    required: true, 
  },
  styleNumber: { type: String, required: true },
  description: { type: String, required: true },
  fabricDetails: { type: String, required: true },
  color: { type: String, required: true },
  wait:{type:String},
  sizeRange: { type: String, required: true },
  isCancelled:{type:Boolean,default:false},
  progress:{type:Number},
  status:{String},

  // Size Distribution (Embedded Object)
  sizeDistribution: {
    sizeDistributionS: { type: Number, default: 0 },
    sizeDistributionM: { type: Number, default: 0 },
    sizeDistributionL: { type: Number, default: 0 },
    sizeDistributionXL: { type: Number, default: 0 },
    sizeDistribution2XL: { type: Number, default: 0 },
    sizeDistribution3XL: { type: Number, default: 0 }
  },
  // Measurement Notes
  measurementNotes: { type: String },

  // Design Information (Embedded Objects)
  frontDesign: {
    imageUrl: { type: String },
    notes: { type: String }
  },
  backDesign: {
    imageUrl: { type: String },
    notes: { type: String }
  },

  // Production Tracking (Pattern Making, Cutting, etc.)
  productionTracking: {
    patternMaking: {
      startDate: { type: Date },
      endDate: { type: Date },
      supervisor: { type: String },
      status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Completed', 'Delayed'], 
        default: 'Pending' 
      }
    },
    cutting: {
      startDate: { type: Date },
      endDate: { type: Date },
      supervisor: { type: String },
      status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Completed', 'Delayed'], 
        default: 'Pending' 
      }
    },
    printing: {
      startDate: { type: Date },
      endDate: { type: Date },
      supervisor: { type: String },
      status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Completed', 'Delayed'], 
        default: 'Pending' 
      }
    },
    sewing: {
      startDate: { type: Date },
      endDate: { type: Date },
      supervisor: { type: String },
      status: { 
        type: String, 
        default: 'Pending' 
      }
    },
    finishing: {
      startDate: { type: Date },
      endDate: { type: Date },
      supervisor: { type: String },
      status: { 
        type: String,  
        default: 'Pending' 
      }
    },
    qualityControl: {
      startDate: { type: Date },
      endDate: { type: Date },
      supervisor: { type: String },
      status: { 
        type: String, 
        default: 'Pending' 
      },
      checks: {
        measurementsCorrect: { type: Boolean, default: false },
        stitchingQuality: { type: Boolean, default: false },
        colorMatching: { type: Boolean, default: false },
        fabricQuality: { type: Boolean, default: false },
        printQuality: { type: Boolean, default: false },
        washTest: { type: Boolean, default: false },
        finishing: { type: Boolean, default: false },
        labelsAndTags: { type: Boolean, default: false },
        notes: { type: String }
      }
    },
    packaging: {
      startDate: { type: Date },
      endDate: { type: Date },
      supervisor: { type: String },
      status: { 
        type: String,  
        default: 'Pending' 
      }
    }
  },
}
);

orderSchema.plugin(autoIncrement, {inc_field: 'jobcardId'});
const orders=mongoose.model('Orders',orderSchema);
module.exports=orders;