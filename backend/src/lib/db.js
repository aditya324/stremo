import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(
      `MongoDB connected to ${conn.connection.name} at ${conn.connection.host}:${conn.connection.port}`
    );
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};
