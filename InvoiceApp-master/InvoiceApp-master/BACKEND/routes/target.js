const express = require("express");
const router = express.Router();
const controller = require("../controllers/targetController");

router.get("/getSheet", controller.getTargetSheet);
router.get("/getTarget", controller.getTarget);
router.get("/getTargetsByEmployee", controller.getTargetsByEmployee);
router.post("/add", controller.addTargetSheet);
router.put("/addTarget", controller.addTarget);
router.put("/updateTarget", controller.updateTarget);
router.delete("/deleteTarget", controller.deleteTarget);
router.get("/getAllOperators", controller.getAllOperators);
router.get("/getAll", controller.getAll);
router.put("/setDaily", controller.updateDailyTarget);

module.exports = router;
