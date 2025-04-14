const {Queue}=require('bullmq')
const Redis=require('../redis/redisClient')

const eventQueue = new Queue('inventory_events', {
    connection: Redis
  });
  
  module.exports = eventQueue;