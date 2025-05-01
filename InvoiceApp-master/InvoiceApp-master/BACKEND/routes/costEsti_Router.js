const express = require("express")
const router = express.Router();
const controllers = require('../controllers/costEsti_controller');


router.get('/costEstimations', controllers.getAllCostEstimationSheets)
router.get('/costEstimations/:costSheetID',controllers.getSingleCostEstimationSheet)
router.post('/cost-estimations', controllers.addCostEstimation)
router.post('/cost-estimations/:costId/cost-breakdown', controllers.addCostBreakdown);
router.put('/updateCostEstimation', controllers.updateCostEstimation);
router.put('/cost-estimations/:costId/cost-breakdown/:breakdownId', controllers.updateCostBreakdown);
router.delete('/deleteCostEstimation', controllers.deleteCostEstimation);
router.delete('/cost-estimations/:costId/cost-breakdown/:breakdownId', controllers.deleteCostBreakdown);
router.get('/response', controllers.getEmailResponse);



module.exports = router;
