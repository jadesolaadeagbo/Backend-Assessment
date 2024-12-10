import { createClient } from 'redis';

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  },
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

export default redisClient;

// call the set function   redis.set 
// open npm documentation to see how the redis.set is use