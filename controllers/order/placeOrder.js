const addOrder = require('../../services/order/addOrder');

const placeOrder = async (req, res, next) => {
    const { prodId } = req.params;
    const { storeId, quantity } = req.body;

    try {
        const order = await addOrder(prodId, storeId, quantity);
        res.status(200).json({
            message: 'success',
            data: order,
        });
    } catch (error) {
        next(error); // Pass the error to the error-handling middleware
    }
};

module.exports = placeOrder;