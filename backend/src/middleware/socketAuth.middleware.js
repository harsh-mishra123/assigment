import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const socketAuthMiddleware = (socket, next) => {
  try {
    // token 
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);

    socket.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    next(new Error("Authentication error"));
  }
};
