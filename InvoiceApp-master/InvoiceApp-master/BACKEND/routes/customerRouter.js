const express = require("express")
const customerRouter = express.Router();
const Cus_controllers = require('../controllers/customer_controller');



customerRouter.post('/add', Cus_controllers.addCustomer)
customerRouter.get('/getAll',Cus_controllers.getAllCustomers)

module.exports = customerRouter;
