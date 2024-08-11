import mongoose from "mongoose";
import process from "process";


export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("error connecting to MongoDB", error);
    }
}