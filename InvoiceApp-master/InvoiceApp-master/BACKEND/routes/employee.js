const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Employee = require("../models/employee");

router.route("/getAllOperators").get((req, res) => {
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
});

module.exports = router;
