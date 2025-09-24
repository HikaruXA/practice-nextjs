// components/ProjectList.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Project {
  project_id: number;
  name: string;
  description?: string;
}

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects/");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.project_id !== id));
      } else {
        console.error("Failed to delete");
      }
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

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {projects.length === 0 ? (
        <div>No projects found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {projects.map((project) => (
                <tr key={project.project_id}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {project.project_id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {project.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {project.description || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(project.project_id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleUpdate(project.project_id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(project.project_id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Delete
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
