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

// This route is hit when customer clicks Approve/Decline
router.get("/response", async (req, res) => {
    const { id, action } = req.query;
  
    if (!id || !["approve", "decline"].includes(action)) {
      return res.status(400).send("Invalid request");
    }
  
    try {
      const isApproved = action === "approve";
      await Estimation.findByIdAndUpdate(id, { isApproved });
  
      res.send(`
        <h2>Thank you!</h2>
        <p>You have ${isApproved ? "approved ✅" : "declined ❌"} the cost estimation.</p>
      `);
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong.");
    }
  });

module.exports = router;
