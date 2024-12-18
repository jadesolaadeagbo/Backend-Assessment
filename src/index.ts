import express from "express"
import dotenv from 'dotenv'
import authenticationRoutes from "./routers/authentication.router"
import teamsRoutes from "./routers/teams.router"
import fixturesRoutes from "./routers/fixtures.router"
import { connection, closeConnection } from "./utils/mongoConnection.utils";
import { sessionMiddleware } from "./middleware/index.middlware";
import { responseLogger, requestLogger, notFoundHandler } from "./middleware/logger.middleware";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.disable('x-powered-by');

app.use(sessionMiddleware);
app.use(express.json());
app.use(requestLogger);
app.use(responseLogger);
app.use("/", authenticationRoutes);
app.use("/teams", teamsRoutes);
app.use("/fixtures", fixturesRoutes);

app.use(notFoundHandler)

const server = app.listen(PORT, () => {
    connection();
    console.log("The server is running on port", PORT)
})

process.on("SIGINT", async () => {
    console.log("\nSIGINT received: Closing server gracefully...");
    server.close(async () => {
        console.log("Server closed.");
        try {
            // Close any open resources (e.g., database connections)
            await closeConnection(); // If you maintain an instance of the connection
            console.log("Connections closed.");
        } catch (error) {
            console.error("Error while closing database connection:", error);
        }
        process.exit(0); // Exit the process
    });
});


/** Steps taken to configure this project
 
 * Create the project using npm init -y, install node modules and dev dependencies
 * Configure the tsc config file and the scripts
 * Configure mongoose connection
 * Configure routes
 * Configure controllers
 * Configure models

*/

// Creating middlewares - isAuthenticated, isAdmin
// Creating session tokens