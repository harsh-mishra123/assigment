"use client";

import { useEffect } from "react";
import { connectSocket, disconnectSocket } from "@/lib/socket";

export const useSocket = (onNewAnnouncement) => {
  useEffect(() => {
    const socket = connectSocket();
    if (!socket) return;

    // Listen for both targeted and broadcast announcements
    socket.on("new_announcement", onNewAnnouncement);
    socket.on("broadcast_announcement", onNewAnnouncement);

    return () => {
      socket.off("new_announcement", onNewAnnouncement);
      socket.off("broadcast_announcement", onNewAnnouncement);
      disconnectSocket();
    };
  }, [onNewAnnouncement]);
};
