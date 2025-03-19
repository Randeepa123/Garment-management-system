const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const empoyeeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },

  post: {
    type: String,
    required: true,
    unique: true,
  },
});

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", empoyeeSchema);

module.exports = Employee;
