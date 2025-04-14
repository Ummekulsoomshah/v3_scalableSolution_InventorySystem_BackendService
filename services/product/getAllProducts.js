const client=require('../../db/databasepg')
const getAllProducts=async()=>{
    try {
        const result = await client.query('SELECT * FROM product');
        return result.rows;
    } catch (error) {
        throw new Error('Error fetching products: ' + error.message);
    }
}
module.exports=getAllProducts