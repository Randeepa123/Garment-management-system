const mongoose = require("mongoose");
const moment = require("moment-timezone");

const MaterialUsageSchema = new mongoose.Schema({
  category: { type: String, required: true },
  itemName: { type: String, required: true },
  quantityUsed: { type: Number, required: true },
  description: { type: String, default: "No description provided" },
  dateUsed: { 
    type: Date, 
    default: () => moment().tz("Asia/Colombo").toDate() 
  }
});

module.exports = mongoose.model("MaterialUsage", MaterialUsageSchema);