import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context';
import { getTasks } from '../services';
import type { Task } from '../types';
import { useNavigate } from 'react-router';
import SearchTasks from '../components/SearchTasks';

export default function OurTasksPage() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [filters, setFilters] = useState<any>({
    status: '',
    priority: '',
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleOnEdit = (taskId?: string | number) => {
    if (!taskId) {
      return;
    }
    navigate(`/update-task/${taskId}`);
  };

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 py-8">
      <div className="w-full max-w-6xl bg-white rounded-md shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">All Tasks</h2>
        
        {/* Hiển thị filter phía trên bảng */}
        <div className="mb-6">
          <div className="flex items-center gap-4 border border-blue-300 rounded-lg px-4 py-3 bg-blue-50">
            <SearchTasks onSearch={handleOnSearch} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-200 rounded-md overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-3 text-left font-semibold">ID</th>
                <th className="px-4 py-3 text-left font-semibold">Title</th>
                <th className="px-4 py-3 text-left font-semibold">Description</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Priority</th>
                <th className="px-4 py-3 text-left font-semibold">Deadline</th>
                <th className="px-4 py-3 text-left font-semibold">Assignee</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
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
                  <td className="px-4 py-2 capitalize">
                    <span
                      className={
                        task.priority === 'high'
                          ? 'text-red-600 font-semibold'
                          : task.priority === 'medium'
                          ? 'text-yellow-600 font-semibold'
                          : 'text-blue-600 font-semibold'
                      }
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : ''}
                  </td>
                  <td className="px-4 py-2">{task.assignee_id}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleOnEdit(task.id)}
                      className="text-blue-600 hover:text-blue-800 font-semibold underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {(!filteredTasks || filteredTasks.length === 0) && (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-400">
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