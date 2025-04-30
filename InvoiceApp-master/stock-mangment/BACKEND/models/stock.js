

const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true }, 
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, 
  supplier: { type: String }, 
  supplierCountry: {type: String},
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Stock", StockSchema);
