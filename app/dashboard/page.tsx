"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ProjectList from "./components/ProjectList";
import TaskList from "./components/TaskList";

type Tab = "projects" | "tasks";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("projects");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === "projects" && <ProjectList />}
        {activeTab === "tasks" && <TaskList />}
      </div>
    </div>
  );
};

export default DashboardPage;
