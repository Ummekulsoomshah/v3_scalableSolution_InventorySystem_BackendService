const router = require('express').Router();
const createProduct = require('../controllers/product/createProduct');
const getProducts = require('../controllers/product/getProducts');

router.post('/addProduct', createProduct);
router.get('/products', getProducts);

module.exports = router;