const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
  category: { type: String, required: true },
  itemName: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model("Material", MaterialSchema);
