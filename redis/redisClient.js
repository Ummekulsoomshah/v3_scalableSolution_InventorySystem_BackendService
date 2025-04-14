// const Redis = require('redis');

// const redisClient = Redis.createClient();
// redisClient.on('error', (err) => console.error('Redis Client Error:', err));

// // Connect to Redis
// (async () => {
//     try {
//         await redisClient.connect();
//         console.log('Redis client connected successfully');
//     } catch (error) {
//         console.error('Failed to connect to Redis:', error);
//     }
// })();

// module.exports = redisClient;
const IORedis = require('ioredis');

const redisClient = new IORedis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null, 
  });
redisClient.on('connect', () => {
    console.log(' Redis (ioredis) client connected');
});

redisClient.on('error', (err) => {
    console.error('Redis (ioredis) connection error:', err);
});

module.exports = redisClient;
