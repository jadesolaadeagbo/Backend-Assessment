import { createLogger, format, transports } from "winston";

export const logger = createLogger({
    level: "info", // Adjust log level as needed (e.g., debug, warn, error)
    format: format.combine(
        format.timestamp(),
        format.json() // Log in JSON format
    ),
    transports: [
        new transports.Stream({
            stream: process.stdout, // Emit logs to process.stdout
        }),
    ],
});
