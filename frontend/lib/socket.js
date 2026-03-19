import { io } from "socket.io-client";
import { getToken } from "./auth";


let socket = null;



export const connectSocket = () => {
  if (socket) return socket;

  const token = getToken();
  if (!token) return null;

  socket = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
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
