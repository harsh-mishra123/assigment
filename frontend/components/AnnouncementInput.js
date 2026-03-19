"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import RichTextEditor from "@/components/RichTextEditor";
import { getUserFromToken } from "@/lib/auth";

export default function AnnouncementInput() {
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [toUserId, setToUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const [usersData, adminsData] = await Promise.all([
          apiRequest("/users"),
          apiRequest("/admins"),
        ]);
        const currentUser = getUserFromToken();
        const allUsers = [...usersData, ...adminsData].filter(
          (u) => u._id !== currentUser?.userId
        );
        setUsers(allUsers);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleSend = async () => {
    const textContent = content.replace(/<[^>]*>/g, "").trim();
    if (!textContent) return;

    setLoading(true);
    try {
      await apiRequest("/announcements", {
        method: "POST",
        body: JSON.stringify({ content, toUserId: toUserId || undefined }),
      });
      setContent("");
      setToUserId("");
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 bg-white p-4 border border-gray-200 rounded">
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="write announcement..."
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <select
            value={toUserId}
            onChange={(e) => setToUserId(e.target.value)}
            className="border border-gray-300 px-3 py-1.5 text-sm text-gray-800 font-medium outline-none focus:border-gray-600 bg-white"
          >
            <option value="">to: everyone</option>
            {users.map((u) => (
              <option key={u._id} value={u._id} className="font-medium">
                to: {u.username} ({u.role})
              </option>
            ))}
          </select>

          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-1.5 bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "sending..." : "send announcement"}
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
}