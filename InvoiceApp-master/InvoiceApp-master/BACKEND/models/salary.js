const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose); // install this via npm if not already

const Schema = mongoose.Schema;

const SalarySchema = new Schema({
  sheetNo: {
    type: Number,
    unique: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  salaries: [
    {
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
      },
      increments: [
        {
          topic: {
            type: String,
            required: true,
          },
          amount: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  ],
});

// Auto-increment sheetNo starting from 1
SalarySchema.plugin(AutoIncrement, { inc_field: "sheetNo" });

const Salary = mongoose.model("Salary", SalarySchema);

module.exports = Salary;
