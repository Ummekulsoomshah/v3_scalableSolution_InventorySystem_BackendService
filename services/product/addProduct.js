const client=require('../../db/databasepg')
const addProduct=async (productName, productPrice) => {    
    try {
        const result = await client.query(
            'INSERT INTO product (name, price) VALUES ($1, $2) RETURNING *',
            [productName, productPrice]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Error adding product: ' + error.message);
    }
}
module.exports=addProduct