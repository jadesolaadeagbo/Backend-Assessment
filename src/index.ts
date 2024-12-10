import express from "express"
import dotenv from 'dotenv'
import authenticationRoutes from "./routers/authentication"
import teamsRoutes from "./routers/teams"
import { connection } from "./utils/mongoConnection.utils";
import { sessionMiddleware } from "./middleware/index.middlware";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.use(sessionMiddleware);

app.use(express.json());
app.use("/", authenticationRoutes);
app.use("/teams", teamsRoutes);

app.listen(PORT, () => {
    connection();
    console.log("The server is running on ", PORT)
})


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