const express = require("express");
const router = express.Router();
const controller = require("../controllers/Invoice_controller");

router.post("/add", controller.addInvoice);
router.get("/getAll", controller.getAllInvoices);
router.put("/addItem", controller.addItemToInvoice);
router.get("/getInvoice", controller.getInvoice);
router.put("/updateItem", controller.updateItemInInvoice);
router.delete("/deleteItem", controller.deleteItemFromInvoice);

module.exports = router;
