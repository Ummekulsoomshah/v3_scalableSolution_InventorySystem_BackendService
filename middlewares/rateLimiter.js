const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, 
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false, 
    keyGenerator: (req) => {
        return req.ip; 
    },
});
module.exports = limiter;