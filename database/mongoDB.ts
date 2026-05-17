import mongoose from "mongoose";
import { DATABASE_URL } from "../config/env.js";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
