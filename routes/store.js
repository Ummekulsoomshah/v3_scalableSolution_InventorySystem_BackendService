const router= require('express').Router();
const createStore=require('../controllers/store/createStore')
const getStores=require('../controllers/store/getStores')

router.post('/addStore',createStore)
router.get('/stores',getStores)

module.exports=router