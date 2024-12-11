"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redisConnection_utils_1 = __importDefault(require("../utils/redisConnection.utils"));
// Initialize Redis store
const redisStore = new connect_redis_1.default({
    client: redisConnection_utils_1.default,
});
redisConnection_utils_1.default.on("connect", () => {
    console.log("Connected to Redis successfully.");
});
redisConnection_utils_1.default.on("error", (err) => {
    console.error("Redis Client Error:", err);
});
// Attempt to connect Redis
redisConnection_utils_1.default.connect().catch((err) => {
    console.error("Could not connect to Redis:", err);
});
exports.sessionMiddleware = (0, express_session_1.default)({
    store: redisStore,
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
});
