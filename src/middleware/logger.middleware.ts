import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger.utils";

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
    logger.info({
        message: "Incoming Request",
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
    });
    next();
};

export const responseLogger = (req: Request, res: Response, next: NextFunction): void => {
    const oldSend = res.send.bind(res); // Preserve the original res.send function
    const start = Date.now();

    // Override res.send
    res.send = (body: any): Response => {
        const duration = Date.now() - start;

        // Set the X-Response-Time header
        if (!res.headersSent) {
            res.setHeader('X-Response-Time', `${duration}ms`);
        }

        // Log outgoing response
        logger.info({
            message: "Outgoing Response",
            statusCode: res.statusCode,
            headers: res.getHeaders(),
            body: body,
        });

        return oldSend(body); 
    };

    // Log the request information
    logger.info({
        message: "Incoming Request",
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body,
    });

    next();
};

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
        status: "fail",
        message: "Resource not found",
        data: null,
    });
};