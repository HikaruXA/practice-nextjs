"use client";

import React from "react";
import useSWR from "swr";
import axiosInstance from "@/lib/axios";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

interface TaskCounts {
  notStarted: number;
  inProgress: number;
  completed: number;
}

interface Project {
  project_id: number;
  name: string;
  description?: string;
  taskCounts: TaskCounts;
}

const statusColors = {
  notStarted: "bg-yellow-100 text-yellow-800",
  inProgress: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

const ProjectList = () => {
  const {
    data: projects = [],
    error,
    isLoading,
    mutate,
  } = useSWR<Project[]>("/projects/", fetcher);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await axiosInstance.delete(`/projects/${id}`);
      mutate();
    } catch (err) {
      console.error("Error deleting project", err);
    }
  };

  const handleUpdate = (id: number) => {
    router.push(`/projects/update/${id}`);
  };

  const handleView = (id: number) => {
    router.push(`/projects/${id}`);
  };

  if (isLoading)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-600 font-semibold">
        Failed to load projects.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {projects.length === 0 ? (
        <div className="text-center text-gray-500">No projects found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Not Started
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  In Progress
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((project) => (
                <tr
                  key={project.project_id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {project.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 truncate max-w-xs whitespace-nowrap overflow-hidden">
                    {project.description || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${statusColors.notStarted}`}
                    >
                      {project.taskCounts?.notStarted ?? 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${statusColors.inProgress}`}
                    >
                      {project.taskCounts?.inProgress ?? 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center">
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${statusColors.completed}`}
                    >
                      {project.taskCounts?.completed ?? 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleView(project.project_id)}
                        aria-label="View project"
                        className="p-2 rounded-full hover:bg-gray-200"
                      >
                        <FiEye size={18} className="text-black" />
                      </button>
                      <button
                        onClick={() => handleUpdate(project.project_id)}
                        aria-label="Update project"
                        className="p-2 rounded-full hover:bg-gray-200"
                      >
                        <FiEdit2 size={18} className="text-black" />
                      </button>
                      <button
                        onClick={() => handleDelete(project.project_id)}
                        aria-label="Delete project"
                        className="p-2 rounded-full hover:bg-gray-200"
                      >
                        <FiTrash2 size={18} className="text-black" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
