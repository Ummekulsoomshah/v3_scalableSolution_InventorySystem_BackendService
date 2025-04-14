const { Queue } = require('bullmq');
const IORedis = require('ioredis');
const redisConnection = new IORedis();
const eventQueue=require('../../queues/eventsQueue')
const inventoryQueue = new Queue('inventory_events', {
    connection: redisConnection,
});

const addOrder = async ( prodId, storeId,quantity) => {
    try {
        await eventQueue.add('stock_add', {
            prodId,
            storeId,
            quantity,
        });
        console.log(`Job added to the queue: storeId=${storeId}, productId=${prodId}, quantity=${quantity}`);
    } catch (error) {
        console.error('Error adding job to the queue:', error);
        throw error; 
    }
};
module.exports = addOrder;