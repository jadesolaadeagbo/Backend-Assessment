import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.utils";
import session from "express-session";
import RedisStore from "connect-redis";
import redisClient from "../utils/redisConnection.utils";

// Extend the Request type to include the `user` property
export interface AuthenticatedRequest extends Request {
  user?: any; // Replace `any` with your user type if available
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({ message: "User Unauthorized!" });
    return; // Ensure no further execution
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach decoded token to request object
    next(); // Pass control to the next middleware
  } catch (error) {
    console.error("Error in authenticateToken middleware:", error);
    res.status(401).json({ message: "Invalid or expired token" });
    next();
  }

  
};

export const isAdmin = (authorizedRole: string) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      console.log(req.headers.authorization);
      const userRole = (req.session as any)?.role; // Dynamically access role
  
      if (userRole !== authorizedRole) {
        res.status(401).json({
          message: "You are not authorized to carry out this action",
        });
        return; // Ensure no further execution
      }
  
      next(); // Pass control to the next middleware
    };
  };
  // we need to get the token 

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

  // Check for the token in redis
  
  