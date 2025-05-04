const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const achievementSchema = new Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const targetAchivementSchema = new Schema(
  {
    targetSheetNo: {
      type: String,
      required: true,
      unique: true,
    },
    achievements: [achievementSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TargetAchivement", targetAchivementSchema);
