import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import redisClient from "./redisConnection.utils";

export const rateLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: async (...args) => redisClient.sendCommand(args),
    }),
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: "Too Many Requests",
        message: "You have exceeded the maximum number of requests. Please try again later.",
    },
});
