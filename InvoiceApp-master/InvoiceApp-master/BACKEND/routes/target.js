const express = require("express");
const router = express.Router();
const controller = require("../controllers/targetController");

router.get("/getSheet", controller.getTargetSheet);
router.get("/getTargetsByEmployee", controller.getTargetsByEmployee);
router.post("/add", controller.addTargetSheet);
router.put("/addTarget", controller.addTarget);
router.put("/updateTarget", controller.updateTarget);
router.delete("/deleteTarget", controller.deleteTarget);
router.get("/getAllOperators", controller.getAllOperators);
router.get("/getAll", controller.getAll);

module.exports = router;
