import express from "express";
import { getActivityLogs } from "../controllers/activityLog.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminMiddleware } from "../middleware/admin.middleware.js";

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.get("/", getActivityLogs);

export default router;
