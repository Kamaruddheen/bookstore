// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Port configuration
export const PORT = 5555;

// MongoDB connection URL fetched from environment variables
export const mongoDBURL = process.env.MONGODB_URI;
