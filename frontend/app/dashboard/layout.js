"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { getUserFromToken, logout } from "@/lib/auth";
import { Menu, LogOut } from "lucide-react";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const userData = getUserFromToken();
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(userData);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* Sidebar - more minimal styling */}
      {user.role === "admin" && sidebarOpen && (
        <div className="fixed md:relative z-20 h-screen w-56 border-r border-gray-100 bg-white/50 backdrop-blur-sm">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      )}
      
      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${
        user.role === "admin" && sidebarOpen ? "md:ml-56" : ""
      }`}>
        {/* Top Bar - minimal header */}
        <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/70 backdrop-blur-sm px-6 py-3">
          <div className="flex items-center justify-end gap-4">
            {/* User info - minimal */}
            <span className="text-sm text-gray-400">
              {user.username} · {user.role}
            </span>
            
            {/* Logout - subtle button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>exit</span>
            </button>
          </div>
        </div>

        {/* Menu toggle for mobile/minimized */}
        {user.role === "admin" && !sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed left-4 top-4 z-20 rounded-full bg-white p-2.5 shadow-sm hover:shadow-md transition-all border border-gray-100"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4 text-gray-400" />
          </button>
        )}

        {/* Page content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}