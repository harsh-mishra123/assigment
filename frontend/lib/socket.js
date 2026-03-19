import { io } from "socket.io-client";
import { getToken } from "./auth";

let socket = null;

export const connectSocket = () => {
  if (socket) return socket;

  const token = getToken();
  if (!token) return null;

  let socketUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // Remove trailing slash if present
  socketUrl = socketUrl.replace(/\/$/, '');

  socket = io(socketUrl, {
    auth: {
      token,
    },
  });

  return socket;
};



export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
