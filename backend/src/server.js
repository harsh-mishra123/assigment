import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { seedInitialAdmin } from "./services/seedAdmin.service.js";
import { connectDB } from "./config/db.js";

import { env } from "./config/env.js";
import { socketAuthMiddleware } from "./middleware/socketAuth.middleware.js";





const startServer = async () => {

  await connectDB();
  await seedInitialAdmin();
  const server = http.createServer(app);

  // Socket.IO with secure CORS previously we were allowing all origins but now we will allow only our frontend origin to connect to socket
  const allowedOrigins = env.CORS_ORIGIN.split(',').map(origin => origin.trim());

  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true
    },
  });


  app.set("io", io);
  io.use(socketAuthMiddleware); //we are using socket middleware

  io.on("connection", (socket) => {
    socket.join(socket.user.userId);

    console.log("User connected:", socket.user.userId);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user.userId);
    });
  });

  // Attach error handler BEFORE calling listen
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${env.PORT} is already in use. Please use a different port.`);
      process.exit(1);
    }
    console.error('Server error:', err.message);
    throw err;
  });

  server.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Server startup failed:", err.message);
  process.exit(1);
});

