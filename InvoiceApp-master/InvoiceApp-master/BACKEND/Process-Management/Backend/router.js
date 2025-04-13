const express=require('express');
const router=express.Router();
const controller=require('./controller');

router.get('/orders',controller.getOrders);
router.post('/addorder',controller.addOrder);
router.post('/findOrderById',controller.findOrderById);
router.post('/updateorder',controller.updateOrder);
router.post('/deleteorder',controller.deleteOrder);

module.exports=router;
