"use client";

import { useState, useEffect } from "react";
import AnnouncementChat from "@/components/AnnouncementChat";
import AnnouncementInput from "@/components/AnnouncementInput";
import { getUserFromToken } from "@/lib/auth";

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header - minimal */}
      <div className="space-y-1">
        <h2 className="text-xs font-mono uppercase tracking-wider text-gray-300">
          / {user.role}
        </h2>
        <h1 className="text-3xl font-light text-gray-700">
          updates
          <span className="text-gray-300 ml-2">·</span>
        </h1>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {user.role === "admin" && (
          <div className="border border-gray-100 rounded-lg p-4 bg-white/30">
            <AnnouncementInput />
          </div>
        )}
        
        <div className="space-y-2">
          <AnnouncementChat />
        </div>
      </div>
    </div>
  );
}