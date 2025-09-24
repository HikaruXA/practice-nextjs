"use client";

import React from "react";
import { FiFolder, FiCheckSquare } from "react-icons/fi";

type Tab = "projects" | "tasks";

interface NavbarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const navItems: { name: string; key: Tab; icon: React.ReactNode }[] = [
    {
      name: "Projects",
      key: "projects",
      icon: <FiFolder className="mr-1.5" size={16} />,
    },
    {
      name: "Tasks",
      key: "tasks",
      icon: <FiCheckSquare className="mr-1.5" size={16} />,
    },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white mb-0">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className={`flex items-center py-4 border-b-2 text-sm font-medium transition-colors ${
                activeTab === item.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:border-gray-300 hover:text-black"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
