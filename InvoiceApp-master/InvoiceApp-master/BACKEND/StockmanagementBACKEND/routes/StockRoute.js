const express = require("express");
const router = express.Router();
const Material = require("../models/material");
const Stock = require("../models/stock");
const MaterialUsage = require("../models/materialUsage");
const moment = require("moment");
const controller = require("../controller/Stockcontroller");



router.post("/add", controller.addStock);

router.get("/", controller.stocklevel);

router.get("/categories",controller.selectCatogary );

router.get("/category/:category",controller.chart_data );

router.get("/recent",controller.PurchaseHistory);

router.delete("/remove/:id",controller.removestock);

router.get("/",controller.getallmaterial);

router.post("/use",controller.materialuse);

router.get("/usage",controller.materialuseHistory);

router.get("/usage/:id",controller.useRecordDelete);

router.post("/predict", controller.predictStock);

router.post("/get-report-data", controller.getReportData);


module.exports = router;

