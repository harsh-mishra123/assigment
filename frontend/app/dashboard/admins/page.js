"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { getUserFromToken } from "@/lib/auth";

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  
  const currentUser = getUserFromToken();

  const fetchAdmins = async () => {
    try {
      const data = await apiRequest("/admins");
      setAdmins(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAdmins(); }, []);

  const handleCreate = async () => {
    if (!username || password.length < 6) return;
    await apiRequest("/admins", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    setUsername("");
    setPassword("");
    fetchAdmins();
  };

  const handleDelete = async (id) => {
    if (id === currentUser?.userId) return;
    await apiRequest(`/admins/${id}`, { method: "DELETE" });
    fetchAdmins();
  };

  const handleUpdate = async (id) => {
    if (!editUsername) return;
    await apiRequest(`/admins/${id}`, {
      method: "PUT",
      body: JSON.stringify({ username: editUsername }),
    });
    setEditingId(null);
    fetchAdmins();
  };

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <span className="text-xs font-mono text-gray-500"></span>
          <h1 className="text-2xl font-semibold text-gray-900 mt-1">Manage Admins</h1>
        </div>
        <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
          ← Dashboard
        </Link>
      </div>

      {/* Create Form */}
      <div className="bg-white p-6 border border-gray-200 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Admin</h2>
        <div className="flex gap-3 items-end">
          <div className="space-y-1 flex-1">
            <span className="text-sm font-medium text-gray-700">Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-gray-600 outline-none text-gray-900 font-medium"
              placeholder="Enter username"
            />
          </div>
          <div className="space-y-1 flex-1">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-gray-600 outline-none text-gray-900 font-medium"
              placeholder="Min 6 characters"
            />
          </div>
          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 font-medium transition-colors"
          >
            Add Admin
          </button>
        </div>
      </div>

      {/* Admins List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Admin List</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {admins.map((admin) => (
            <div key={admin._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              {editingId === admin._id ? (
                <div className="flex-1 flex items-center gap-3">
                  <input
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-900 font-medium"
                    autoFocus
                  />
                  <button
                    onClick={() => handleUpdate(admin._id)}
                    className="text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-sm font-medium text-gray-400 hover:text-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">
                      {admin.username}
                    </span>
                    {admin._id === currentUser?.userId && (
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        you
                      </span>
                    )}
                  </div>
                  {admin._id !== currentUser?.userId && (
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          setEditingId(admin._id);
                          setEditUsername(admin.username);
                        }}
                        className="text-sm font-medium text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(admin._id)}
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          {admins.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              No admins found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}