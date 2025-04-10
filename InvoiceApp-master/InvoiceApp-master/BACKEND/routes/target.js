const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Target = require("../models/target");

router.route("/getSheet").get((req, res) => {
  const SheetNum = req.query.SheetNo;

  Target.findOne({ SheetNo: SheetNum })
    .populate("Targets.EmployeeId")
    .then((targetSheet) => {
      res.json(targetSheet.Targets);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch targets" });
    });
});

router.route("/getTargetsByEmployee").get(async (req, res) => {
  try {
    const SheetNum = req.query.SheetNo;
    const operator = req.query.operator; // This is received as a string

    if (!mongoose.Types.ObjectId.isValid(operator)) {
      return res.status(400).json({ error: "Invalid EmployeeId format" });
    }

    const targetSheet = await Target.findOne({ SheetNo: SheetNum });

    if (!targetSheet) {
      return res.status(404).json({ error: "Sheet not found" });
    }

    // Convert operator to ObjectId for comparison
    const employeeTargets = targetSheet.Targets.filter(
      (target) => target.EmployeeId.toString() === operator
    );

    res.json(employeeTargets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch targets" });
  }
});

router.route("/add").post((req, res) => {
  const SheetNo = req.body.SheetNo;
  const OrderNo = req.body.OrderNo;

  const newTargetSheet = new Target({
    SheetNo,
    OrderNo,
  });

  // Save the invoice to the database
  newTargetSheet
    .save()
    .then(() => {
      res.json("New Target Sheet Created!!");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to creat target sheet" });
    });
});

router.route("/addTarget").put((req, res) => {
  const EmployeeId = req.body.EmployeeId;
  const Operation = req.body.Operation;
  const ITarget = req.body.Itarget;
  const SheetNum = req.query.SheetNo;

  Target.findOne({ SheetNo: SheetNum }).then((targetSheet) => {
    if (!targetSheet) {
      return res.status(404).json({ error: "Target Sheet not found" });
    }

    targetSheet.Targets.push({
      EmployeeId: EmployeeId,
      Operation: Operation,
      ITarget: ITarget,
    });

    targetSheet
      .save()
      .then(() => {
        res.json("Individual Target Added!");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Failed to add individual targets" });
      });
  });
});

router.route("/updateTarget").put((req, res) => {
  const EmployeeId = req.query.EmployeeId;
  const Operation = req.query.Operation;
  const SheetNum = req.query.SheetNo;

  const Time = req.body.time;
  const quantity = req.body.quantity;

  Target.findOne({ SheetNo: SheetNum }).then((targetSheet) => {
    if (!targetSheet) {
      return res.status(404).json({ error: "Target sheet not found" });
    }

    Target.updateOne(
      {
        SheetNo: SheetNum,
        "Targets.EmployeeId": EmployeeId,
        "Targets.Operation": Operation,
      },
      {
        $push: {
          "Targets.$.IOuts": { Time: Time, quantity: quantity }, // Add the new value to the IOuts array
        },
      }
    )
      .then((result) => {
        if (result.nModified === 0) {
          return res
            .status(404)
            .json({ error: "Target not found or no changes made" });
        }
        res.json("Target updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Failed to update target" });
      });
  });
});

module.exports = router;
