import dotenv from "dotenv";
dotenv.config();

export const { MONGO_URI, SESSION_SECRET } = process.env;
