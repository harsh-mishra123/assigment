import dotenv from "dotenv";
dotenv.config();


export const env = {
PORT: process.env.PORT || 4000,
MONGO_URI: process.env.MONGO_URI,
NODE_ENV: process.env.NODE_ENV || "development",
INIT_ADMIN_USERNAME: process.env.INIT_ADMIN_USERNAME,
INIT_ADMIN_PASSWORD: process.env.INIT_ADMIN_PASSWORD,
JWT_SECRET: process.env.JWT_SECRET,
CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000"
}