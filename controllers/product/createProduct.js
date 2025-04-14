const addProduct  = require('../../services/product/addProduct');
const createProduct=async (req, res) => {
    try {
        const { productName, productPrice } = req.body;
        const product = await addProduct(productName, productPrice);
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        next(error);
    }
}
module.exports = createProduct;