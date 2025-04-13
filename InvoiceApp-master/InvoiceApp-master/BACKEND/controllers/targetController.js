const Target = require("../models/target");
const Employee = require("../models/employee");

const getAllOperators = (req, res, next) => {
  Employee.find({ post: "operator" })
    .then((operators) => {
      if (operators.length === 0) {
        return res.json({ foundInvoices: false });
      }
      res.json(operators);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch opertors" });
    });
};

const getAll = (req, res, next) => {
  Target.find()
    .populate("Targets.EmployeeId")
    .then((targetSheets) => {
      res.json(targetSheets);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch targets" });
    });
};

const getTargetSheet = (req, res, next) => {
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
};

const getTargetsByEmployee = async (req, res, next) => {
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
};

const addTargetSheet = (req, res, next) => {
  const SheetNo = req.body.SheetNo;
  const jobcardId = req.body.jobcardId;

  const newTargetSheet = new Target({
    SheetNo,
    jobcardId,
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
};

const addTarget = (req, res, next) => {
  const EmployeeId = req.body.EmployeeId;
  const Operation = req.body.Operation;
  const ITarget = req.body.Itarget;
  const OperationPg = req.body.OperationPg;
  const SheetNum = req.query.SheetNo;

  Target.findOne({ SheetNo: SheetNum }).then((targetSheet) => {
    if (!targetSheet) {
      return res.status(404).json({ error: "Target Sheet not found" });
    }

    targetSheet.Targets.push({
      EmployeeId: EmployeeId,
      Operation: Operation,
      ITarget: ITarget,
      OperationPg: OperationPg,
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
};

const updateTarget = (req, res, next) => {
  const EmployeeId = req.query.EmployeeId;
  const Operation = req.query.Operation;
  const SheetNum = req.query.SheetNo;

  const TimeIndex = req.body.time;
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
        $set: {
          [`Targets.$.IOuts.${TimeIndex}`]: quantity, // Update specific index in IOuts array
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
};

const deleteTarget = (req, res, next) => {
  const objId = req.query.objId;

  Target.updateOne(
    { "Targets._id": objId },
    { $pull: { Targets: { _id: objId } } }
  )
    .then((result) => {
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: "Target not found" });
      }

      res.json({ message: "Target removed successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to remove target" });
    });
};

exports.getTargetSheet = getTargetSheet;
exports.getTargetsByEmployee = getTargetsByEmployee;
exports.addTargetSheet = addTargetSheet;
exports.addTarget = addTarget;
exports.updateTarget = updateTarget;
exports.deleteTarget = deleteTarget;
exports.getAllOperators = getAllOperators;
exports.getAll = getAll;
