import mongoose from "mongoose";

let isConnected = false; 

export function connection(): void {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        console.log("MongoDB URI is not defined");
        process.exit(1);
    }

    if (!isConnected) {
        mongoose
            .connect(mongoUri)
            .then(() => {
                isConnected = true;
                console.log("Connection to MongoDB successful");
            })
            .catch((error: Error) => {
                console.error("Error in MongoDB connection:", error);
                process.exit(1);
            });
    }
}

// Add a method to close the connection
export async function closeConnection(): Promise<void> {
    if (isConnected) {
        try {
            await mongoose.connection.close();
            isConnected = false;
            console.log("MongoDB connection closed successfully.");
        } catch (error) {
            console.error("Error closing MongoDB connection:", error);
        }
    }
}
