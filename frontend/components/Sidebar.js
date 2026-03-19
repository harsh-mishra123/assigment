"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { path: "/dashboard/admins", label: "admins" },
    { path: "/dashboard/users", label: "users" },
    { path: "/dashboard/activity-logs", label: "activity" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  if (!isOpen) {
    return (
      <button
        onClick={toggleSidebar}
        className="fixed top-5 left-5 z-50 w-10 h-10 bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50"
      >
        <span className="text-gray-600 text-xl font-bold">≡</span>
      </button>
    );
  }

  return (
    <div className="fixed top-0 left-0 h-full w-56 bg-white border-r border-gray-200 z-40">
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-5 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50"
      >
        <span className="text-gray-500 text-sm font-bold">←</span>
      </button>

      <div className="p-5">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900">portal</h1>
          <p className="text-xs font-semibold text-gray-500 mt-0.5">management</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`
                block px-3 py-2.5 text-sm font-bold
                ${pathname === item.path
                  ? "bg-gray-900 text-white"
                  : "text-gray-800 hover:bg-gray-100"
                }
              `}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}