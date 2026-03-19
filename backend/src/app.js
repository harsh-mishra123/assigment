import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import cors from "cors";
import announcementRoutes from "./routes/announcement.routes.js";
import activityLogRoutes from "./routes/activityLog.routes.js";
import { env } from "./config/env.js";
import rateLimit from "express-rate-limit";

const app = express();





app.use(express.json());

// Configuring cors after deployement
const allowedOrigins = env.CORS_ORIGIN.split(',').map(origin => origin.trim());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`CORS Error: Origin "${origin}" not in allowedOrigins:`, allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate limiting  
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //time is 15 minutes
  max: 100, // Limit each IP to 100 requests 
  message: { message: "Too many requests,please try again later." }, // i sends message in json for frontend to handle it properly
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      message: "Too many requests, please try again later."
    });
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests
  message: { message: "Too many login attempts, please try again after 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      message: "Too many login attempts, please try again after 15 minutes."
    });
  }
});

//  general rate limit to all routes
app.use(generalLimiter);




app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

//added authlimiter here
app.use("/auth", authLimiter, authRoutes);
app.use("/admins", adminRoutes);
app.use("/users", userRoutes);
app.use("/announcements", announcementRoutes);
app.use("/activity-logs", activityLogRoutes);



export default app;






