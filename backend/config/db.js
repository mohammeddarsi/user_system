import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log(`Database Connected ${conn.connection.host}`);
  } catch (error) {
    console.error("Error to connect Database", error);
    process.exit(1);
  }
};
