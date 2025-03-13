const express = require('express');
const router = express.Router();
const controllers = require('../controllers/costEsti_controller');


router.get('/costEstimations', controllers.getAllCostEstimationSheets);
router.post('/createCostEstimation', controllers.addCostEstimation);
router.put('/updateCostEstimation', controllers.updateCostEstimation);
router.delete('/deleteCostEstimation', controllers.deleteCostEstimation);
router.delete('/deleteCostEstimationBreakdown', controllers.deleteCostBreakdown);

module.exports = router;
