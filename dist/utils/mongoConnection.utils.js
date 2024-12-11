"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = connection;
const mongoose_1 = __importDefault(require("mongoose"));
function connection() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.log("Mongo Uri is not defined");
        process.exit(1);
    }
    mongoose_1.default.connect(mongoUri).then(() => console.log("Connection to Mongo DB successful")).catch((error) => console.error("Error in Mongo DB connection: ", error));
}
