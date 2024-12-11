"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authentication_1 = __importDefault(require("./routers/authentication"));
const teams_1 = __importDefault(require("./routers/teams"));
const mongoConnection_utils_1 = require("./utils/mongoConnection.utils");
const index_middlware_1 = require("./middleware/index.middlware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use(index_middlware_1.sessionMiddleware);
app.use(express_1.default.json());
app.use("/", authentication_1.default);
app.use("/teams", teams_1.default);
app.listen(PORT, () => {
    (0, mongoConnection_utils_1.connection)();
    console.log("The server is running on ", PORT);
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
