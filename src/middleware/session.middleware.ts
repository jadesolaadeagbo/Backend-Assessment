import session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "../utils/redisConnection.utils";

// Initialize Redis store
const redisStore = new RedisStore({
  client: redisClient,
});

redisClient.on("connect", () => {
    console.log("Connected to Redis successfully.");
  });
  
  redisClient.on("error", (err) => {
    console.error("Redis Client Error:", err);
  });
  
  // Attempt to connect Redis
  redisClient.connect().catch((err) => {
    console.error("Could not connect to Redis:", err);
  });

export const sessionMiddleware = session({
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
