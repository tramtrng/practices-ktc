import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context';
import { getTasksByAssignee } from '../services';
import type { Task } from '../types';
import SearchTasks from '../components/SearchTasks';

export default function MyTasksPage() {
  const { user } = useContext(AuthContext);

  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [filters, setFilters] = useState<any>({
    status: '',
    priority: '',
  });

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return;
      try {
        const tasks = await getTasksByAssignee(user.id);
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [user]);

  // Hàm nhận filter từ SearchTasks
  const handleOnSearch = (newFilters: { status?: string; priority?: string }) => {
    setFilters(f => ({ ...f, ...newFilters }));
  };

  const filteredTasks = tasks.filter((task: Task) => {
    let matches = true;
    if (filters.status && task.status !== filters.status) {
      matches = false;
    }
    if (filters.priority && task.priority !== filters.priority) {
      matches = false;
    }
    return matches;
  });

  return (
    <div className="flex min-h-screen items-center justify-center py-8">
      <div className="w-full max-w-6xl bg-white rounded-md shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Your Tasks List</h2>
        {/* Filter giống OurTasksPage */}
        <div className="mb-6">
          <div className="flex items-center gap-4 border border-blue-300 rounded-lg px-4 py-3 bg-blue-50">
            <SearchTasks onSearch={handleOnSearch} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-200">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">ID</th>
                <th className="px-4 py-3 text-left font-semibold">Title</th>
                <th className="px-4 py-3 text-left font-semibold">Description</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Assignee</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-100">
              {filteredTasks?.map((task: Task) => (
                <tr key={task.id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-2">{task.id}</td>
                  <td className="px-4 py-2">{task.title}</td>
                  <td className="px-4 py-2">{task.description}</td>
                  <td className="px-4 py-2">
                    <span
                      className={
                        task.status === 'done'
                          ? 'text-green-600 font-semibold'
                          : task.status === 'in_progress'
                          ? 'text-yellow-600 font-semibold'
                          : 'text-blue-600 font-semibold'
                      }
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{task.assignee_id}</td>
                </tr>
              ))}
              {(!filteredTasks || filteredTasks.length === 0) && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">
                    Không có công việc nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}