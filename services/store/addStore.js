const client=require('../../db/databasepg')
const addStore=async (storeName, storeAddress) => {
    try {
        await client.query('INSERT INTO store (name, address) VALUES ($1, $2)', [storeName, storeAddress]);
        console.log('Store created successfully');
        return true;
    } catch (error) {
        throw new Error('Error creating store: ' + error.message);
    }
}
module.exports=addStore