const router=require('express').Router();
const placeOrder=require('../controllers/order/placeOrder');

router.post('/orderProduct/:prodId',placeOrder)

module.exports=router