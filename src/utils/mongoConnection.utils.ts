import mongoose from 'mongoose';

export function connection():void{
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri){
        console.log("Mongo Uri is not defined");
        process.exit(1)
    }

    mongoose.connect(mongoUri).then(() => console.log("Connection successful")).catch((error: Error) => console.error("Error in Mongo DB connection: ", error))
}