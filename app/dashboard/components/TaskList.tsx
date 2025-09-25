"use client";

import React from "react";
import useSWR from "swr";
import axiosInstance from "@/lib/axios";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/navigation";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

interface Task {
  task_id: number;
  title: string;
  description?: string;
}

const TaskList = () => {
  const {
    data: tasks,
    error,
    isLoading,
    mutate,
  } = useSWR<Task[]>("/tasks/", fetcher);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await axiosInstance.delete(`/tasks/${id}`);
      mutate();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const handleUpdate = (id: number) => {
    router.push(`/tasks/update/${id}`);
  };

  const handleView = (id: number) => {
    router.push(`/tasks/${id}`);
  };

  if (isLoading)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-600 font-semibold">
        Failed to load tasks.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {tasks?.length === 0 ? (
        <div className="text-center text-gray-500">No tasks found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <tbody className="divide-y divide-gray-100">
              {tasks?.map((task) => (
                <tr
                  key={task.task_id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 truncate max-w-xs whitespace-nowrap overflow-hidden">
                    {task.description || "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleView(task.task_id)}
                        aria-label="View task"
                        className="p-2 rounded-full hover:bg-gray-200"
                      >
                        <FiEye size={18} className="text-black" />
                      </button>
                      <button
                        onClick={() => handleUpdate(task.task_id)}
                        aria-label="Update task"
                        className="p-2 rounded-full hover:bg-gray-200"
                      >
                        <FiEdit2 size={18} className="text-black" />
                      </button>
                      <button
                        onClick={() => handleDelete(task.task_id)}
                        aria-label="Delete task"
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

export default TaskList;
