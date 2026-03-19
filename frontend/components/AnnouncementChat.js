"use client";

import { useEffect, useState, useCallback } from "react";
import { apiRequest } from "@/lib/api";
import { useSocket } from "@/hooks/useSocket";

export default function AnnouncementChat() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest("/announcements")
      .then(setAnnouncements)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleNewAnnouncement = useCallback((announcement) => {
    setAnnouncements((prev) => 
      prev.some((a) => a._id === announcement._id) ? prev : [announcement, ...prev]
    );
  }, []);
  
  useSocket(handleNewAnnouncement);

  if (loading) return <div className="text-sm text-gray-500">loading announcements...</div>;

  return (
    <div className="space-y-6">
      {announcements.length === 0 ? (
        <div className="text-sm text-gray-500">no announcements yet</div>
      ) : (
        announcements.map((a) => (
          <div key={a._id} className="border-b border-gray-200 pb-4 last:border-0">
            <div 
              className="text-base text-gray-900 font-medium leading-relaxed"
              dangerouslySetInnerHTML={{ __html: a.content }} 
            />
            <div className="mt-2 flex items-center gap-3 text-sm text-gray-700">
              <span className="font-semibold">{a.fromAdmin?.username || 'admin'}</span>
              {a.toUser && (
                <>
                  <span className="text-gray-400">→</span>
                  <span className="font-medium text-gray-800">{a.toUser.username}</span>
                </>
              )}
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{new Date(a.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}