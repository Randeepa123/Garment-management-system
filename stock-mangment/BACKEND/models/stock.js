const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Shirts, Pants
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // Price per unit
  supplier: { type: String }, // Supplier details
  dateAdded: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Stock", StockSchema);
