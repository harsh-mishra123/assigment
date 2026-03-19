"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await apiRequest("/activity-logs");
        setLogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) {
    return <div className="p-8 text-gray-500">Loading activity logs...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <span className="text-xs font-mono text-gray-500"></span>
          <h1 className="text-2xl font-semibold text-gray-900 mt-1">Activity Logs</h1>
        </div>
        <Link 
          href="/dashboard" 
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Dashboard
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        
        {logs.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            No activity logs yet
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {logs.map((log) => (
              <div key={log._id} className="px-6 py-4 hover:bg-gray-50">
                <div className="grid grid-cols-12 gap-4 text-sm">
                  <div className="col-span-3 font-mono text-gray-500">
                    {new Date(log.createdAt).toLocaleString()}
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold text-gray-900">
                      {log.action?.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <span className="font-medium text-gray-800">
                      {log.performedByUsername || 'System'}
                    </span>
                    <span className="text-gray-400 text-xs ml-2">
                      ({log.performedByRole || 'N/A'})
                    </span>
                  </div>
                  <div className="col-span-4">
                    <span className="text-gray-600">→ </span>
                    <span className="font-medium text-gray-800">
                      {log.targetUsername || 'Unknown'}
                    </span>
                    <span className="text-gray-400 text-xs ml-2">
                      ({log.targetRole || 'N/A'})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}