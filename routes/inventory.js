const router= require('express').Router();
const updateInventoryByStoreIdAndProductId=require('../controllers/inventory/updateInventoryByStoreIdAndProductId')
// const getInventoryByStoreId=require('../controllers/inventory/getInventoryByStoreId')
// const getInventoryByStoreIdAndProductId=require('../controllers/inventory/getInventoryByStoreIdAndProductId')
// const getStockmovements=require('../controllers/inventory/getStockmovements')

router.put('/stores/:store_id/stock/:product_id',updateInventoryByStoreIdAndProductId)
// router.get('/stores/:storeId/:prodId',getInventoryByStoreIdAndProductId)
// router.get('/inventory/:storeId',getInventoryByStoreId)
// router.get('/stockmovements',getStockmovements)
module.exports=router
