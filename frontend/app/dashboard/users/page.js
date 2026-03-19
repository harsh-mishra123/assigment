"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editUsername, setEditUsername] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await apiRequest("/users");
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleCreate = async () => {
    if (!username || password.length < 6) return;
    await apiRequest("/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    setUsername("");
    setPassword("");
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await apiRequest(`/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const handleUpdate = async (id) => {
    if (!editUsername) return;
    await apiRequest(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ username: editUsername }),
    });
    setEditingId(null);
    fetchUsers();
  };

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <span className="text-xs font-mono text-gray-500">/ users</span>
          <h1 className="text-2xl font-semibold text-gray-900 mt-1">Manage Users</h1>
        </div>
        <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-gray-900">
          ← Dashboard
        </Link>
      </div>

      <div className="bg-white p-6 border border-gray-200 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New User</h2>
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
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 font-medium"
          >
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">User List</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {users.map((user) => (
            <div key={user._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
              {editingId === user._id ? (
                <div className="flex-1 flex items-center gap-3">
                  <input
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-900 font-medium"
                    autoFocus
                  />
                  <button
                    onClick={() => handleUpdate(user._id)}
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
                  <span className="font-semibold text-gray-900">{user.username}</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        setEditingId(user._id);
                        setEditUsername(user.username);
                      }}
                      className="text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          {users.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}