const Employee = require("../models/employee");

const getAllOperators = (req, res, next) => {
  Employee.find({ post: "operator" })
    .then((operators) => {
      if (operators.length === 0) {
        return res.json({ foundInvoices: false });
      }
      res.json(operators); // Send invoices as the response
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch opertors" });
    });
};

exports.getAllOperators = getAllOperators;
