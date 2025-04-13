const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

router.get("/orders", controller.getOrders);

module.exports = router;
