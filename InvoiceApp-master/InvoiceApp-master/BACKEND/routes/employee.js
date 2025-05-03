const express = require("express");
const router = express.Router();
const controller = require("../controllers/salaryController");

router.get("/getSalarySheet", controller.getSalarySheet);
router.post("/createSalarySheet", controller.createSalarySheet);
router.put("/addIncrement", controller.addIncrement);

module.exports = router;
