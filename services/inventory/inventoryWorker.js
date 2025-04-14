const { Worker } = require('bullmq');
const Redis = require('../../redis/redisClient');
const client = require('../../db/databasepg')

const inventoryWorker = new Worker('inventory_events', async (job) => {
    const { name, data } = job;
    try {
        if (name === 'stock_add') {
            const {  prodId, storeId,quantity } = data;

            console.log(`Stock Sold Event: Deducting ${quantity} from store ${storeId}...`);

            await client.query(`
      UPDATE storestock
      SET quantity = quantity - $1
      WHERE store_id = $2 AND product_id = $3
    `, [quantity, storeId, prodId]);

            console.log('Inventory updated');
        } else {
            console.log('Unknown event type:', name);
        }

    } catch (err) {
        console.error('Error processing job:', err);
        
    }
}, { connection: Redis });
