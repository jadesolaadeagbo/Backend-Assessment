"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
    },
});
redisClient.on('error', (err) => console.error('Redis Client Error:', err));
exports.default = redisClient;
// call the set function   redis.set 
// open npm documentation to see how the redis.set is use
