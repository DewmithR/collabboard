import mongoose from "mongoose";
import { config } from "../config.js";

export async function connectDb() {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
