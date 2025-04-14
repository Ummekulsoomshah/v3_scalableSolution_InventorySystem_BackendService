const client=require('../../db/databasepg')
const getAllStores=async()=>{
    try {
        const result = await client.query('SELECT * FROM store');
        return result.rows;
    } catch (error) {
        throw new Error('Error fetching stores: ' + error.message);
    }
}
module.exports=getAllStores