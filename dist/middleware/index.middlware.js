"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = exports.isAdmin = exports.authenticateToken = void 0;
const token_utils_1 = require("../utils/token.utils");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redisConnection_utils_1 = __importDefault(require("../utils/redisConnection.utils"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401).json({ message: "User Unauthorized!" });
        return; // Ensure no further execution
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = (0, token_utils_1.verifyToken)(token);
        req.user = decoded; // Attach decoded token to request object
        next(); // Pass control to the next middleware
    }
    catch (error) {
        console.error("Error in authenticateToken middleware:", error);
        res.status(401).json({ message: "Invalid or expired token" });
        next();
    }
};
exports.authenticateToken = authenticateToken;
const isAdmin = (authorizedRole) => {
    return (req, res, next) => {
        var _a;
        console.log(req.headers.authorization);
        const userRole = (_a = req.session) === null || _a === void 0 ? void 0 : _a.role; // Dynamically access role
        if (userRole !== authorizedRole) {
            res.status(401).json({
                message: "You are not authorized to carry out this action",
            });
            return; // Ensure no further execution
        }
        next(); // Pass control to the next middleware
    };
};
exports.isAdmin = isAdmin;
// we need to get the token 
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
// Check for the token in redis
