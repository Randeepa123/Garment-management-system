const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TargetSchema = new Schema({
  SheetNo: {
    type: String,
    required: true,
    unique: true,
  },
  jobcardId: {
    type: String,
    required: true,
  },
  Targets: [
    {
      EmployeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
      Operation: {
        type: String,
      },
      ITarget: {
        type: Number,
      },
      OperationPg: {
        type: Number,
      },
      IOuts: [
        {
          type: Number,
        },
      ],
    },
  ],
});

const Target = mongoose.model("Target", TargetSchema);

module.exports = Target;
