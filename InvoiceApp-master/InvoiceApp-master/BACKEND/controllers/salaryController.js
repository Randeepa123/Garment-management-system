const Salary = require("../models/salary");
const Employee = require("../models/employee"); // adjust path as needed

const getSalarySheet = (req, res, next) => {
  const { year, month } = req.query;

  if (!year || !month) {
    return res.status(400).json({ error: "Year and month are required" });
  }

  Salary.findOne({ year: parseInt(year), month: month })
    .populate("salaries.employee")
    .then((salarySheet) => {
      if (!salarySheet) {
        return res.status(404).json({ error: "Salary sheet not found" });
      }
      res.json(salarySheet.salaries);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch salary sheet" });
    });
};

const createSalarySheet = async (req, res) => {
  try {
    const { month, year } = req.body;

    if (!month || !year) {
      return res.status(400).json({ error: "month and year are required" });
    }

    // Fetch all employees
    const employees = await Employee.find({});

    // Create salary entries for all employees
    const salaries = employees.map((employee) => ({
      employee: employee._id,
      increments: [], // Initialize with empty increments array
    }));

    const newSheet = new Salary({
      month,
      year,
      salaries,
    });

    const savedSheet = await newSheet.save();

    res.status(201).json({
      message: "Salary sheet created successfully",
      sheet: savedSheet,
    });
  } catch (err) {
    console.error("Error creating salary sheet:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addIncrement = async (req, res) => {
  try {
    const { employeeId, topic, amount, year, month } = req.body;

    if (!employeeId || !topic || !amount || !year || !month) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const salarySheet = await Salary.findOne({
      year: parseInt(year),
      month: month,
    });
    if (!salarySheet) {
      return res
        .status(404)
        .json({ error: "Salary sheet not found for given year and month" });
    }

    // Find the employee's salary entry
    const employeeSalary = salarySheet.salaries.find(
      (salary) => salary.employee.toString() === employeeId
    );

    if (!employeeSalary) {
      return res
        .status(404)
        .json({ error: "Employee not found in salary sheet" });
    }

    // Add the new increment
    employeeSalary.increments.push({
      topic,
      amount: parseFloat(amount),
    });

    await salarySheet.save();

    res.status(200).json({
      message: "Increment added successfully",
      salarySheet,
    });
  } catch (err) {
    console.error("Error adding increment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSalarySheet = getSalarySheet;
exports.createSalarySheet = createSalarySheet;
exports.addIncrement = addIncrement;
