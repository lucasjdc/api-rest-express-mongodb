import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI);

    return mongoose.connection;
}

export default connectDB;
