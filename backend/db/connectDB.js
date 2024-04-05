import mongoose from "mongoose";
import { MONGO_URI } from "../config/index.js";

export const connectionDB = async () => {
  try {
    const res = await mongoose.connect(MONGO_URI);
    console.log("Database connection established ", res.connection.host);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
