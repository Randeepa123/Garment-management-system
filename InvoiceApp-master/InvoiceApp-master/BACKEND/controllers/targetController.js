const Target = require("../models/target");
const Employee = require("../models/employee");
const { OpenAI } = require("openai");

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

const getTarget = (req, res, next) => {
  const SheetNum = req.query.SheetNo;

  Target.findOne({ SheetNo: SheetNum })
    .populate("Targets.EmployeeId")
    .then((targetSheet) => {
      res.json(targetSheet);
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
  const DailyTarget = req.body.DailyTarget;

  const newTargetSheet = new Target({
    SheetNo,
    jobcardId,
    DailyTarget,
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

const updateDailyTarget = (req, res) => {
  const sheetNo = req.query.SheetNo; // Get SheetNo from query string
  const newDailyTarget = req.body.DailyTarget; // New value from request body

  Target.findOneAndUpdate(
    { SheetNo: sheetNo },
    { $set: { DailyTarget: newDailyTarget } },
    { new: true } // return the updated document
  )
    .then((updatedTarget) => {
      if (!updatedTarget) {
        return res.status(404).json({ error: "Target Sheet not found" });
      }
      res.json({ message: "DailyTarget updated successfully", updatedTarget });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to update DailyTarget" });
    });
};

const schedule = async (req, res) => {
  const { orders } = req.body;

  // Validate input
  if (!orders || !Array.isArray(orders)) {
    return res
      .status(400)
      .json({ error: 'Invalid or missing "orders" array.' });
  }

  // Initialize OpenAI API
  const openai = new OpenAI({
    // apiKey: process.env.OPENAI_API_KEY,
  });

  // Construct the prompt for the assistant
  const constructPrompt = (orders) => {
    return `
You are a scheduling assistant.

Given the following job orders:

${JSON.stringify(orders, null, 2)}

Schedule these jobs with the following constraints:
- No overlaps or gaps between jobs.
- Prioritize jobs based on urgency, where urgency = (due_date - start_date).
- Output the schedule as a JSON array in the format:
[
  { "jobcardID": number, "start_date": "YYYY-MM-DD", "end_date": "YYYY-MM-DD" },
  ...
]
`;
  };

  try {
    const prompt = constructPrompt(orders);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
    });

    const aiText = completion.choices[0].message.content.trim();

    // Attempt to extract the JSON part from the AI response
    const jsonStart = aiText.indexOf("[");
    const jsonEnd = aiText.lastIndexOf("]") + 1;
    const jsonString = aiText.substring(jsonStart, jsonEnd);

    const scheduledJobs = JSON.parse(jsonString);

    res.json({ scheduled_jobs: scheduledJobs });
  } catch (error) {
    console.error("Error scheduling jobs:", error.message);
    res.status(500).json({ error: "Failed to schedule jobs." });
  }
};

exports.getTargetSheet = getTargetSheet;
exports.getTargetsByEmployee = getTargetsByEmployee;
exports.addTargetSheet = addTargetSheet;
exports.addTarget = addTarget;
exports.updateTarget = updateTarget;
exports.deleteTarget = deleteTarget;
exports.getAllOperators = getAllOperators;
exports.getAll = getAll;
exports.updateDailyTarget = updateDailyTarget;
exports.getTarget = getTarget;
exports.schedule = schedule;
