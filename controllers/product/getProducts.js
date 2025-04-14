const getAllProducts = require('../../services/product/getAllProducts');
const redisClient=require('../../redis/redisClient')
const DEFAULT_EXPIRATION = 3600;


const getProducts = async (req, res, next) => {
    try {
        const data=await redisClient.get('products')
 
            if (data) {
                console.log('Data from Redis:', JSON.parse(data));
                return res.status(200).json({
                    success: true,
                    message: 'Products fetched successfully',
                    products: JSON.parse(data),
                });
            } else {
                console.log('Fetching data from database...');
                const products = await getAllProducts();
                console.log('products', products);
                redisClient.setEx('products', DEFAULT_EXPIRATION, JSON.stringify(products));
                res.status(200).json({
                    success: true,
                    message: 'Products fetched successfully',
                    products,
                });
            }
     
    } catch (error) {
        next(error);
    }
};

module.exports = getProducts;