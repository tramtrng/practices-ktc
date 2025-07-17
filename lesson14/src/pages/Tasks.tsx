/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useAuthStore } from '../useAuthStore';
import { useNavigate } from 'react-router';
import { apiClient } from '../libraries/api-client';

export default function Tasks() {
  const { logOut, loggedInUser } = useAuthStore((state) => state);
  const [tasks, setTasks] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.loggedInUser);
  const hasAdminRole = user?.roles.some((role) => role.name === 'Administrators');

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    }
  }, [loggedInUser, navigate]);

  const fetchTasks = async () => {
    try {
      const tasks = (await apiClient.get('/workspaces/tasks')) as any[];
      console.log(tasks);
      setTasks(tasks);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setLoading(true);
    try {
      if (typeof apiClient.delete === 'function') {
        await apiClient.delete(`/workspaces/tasks/${taskId}`);
      } else {
        throw new Error('apiClient.delete is not defined');
      }
      await fetchTasks();
      alert('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
        <div className="flex gap-4">
          {hasAdminRole && (
            <button
              onClick={() => navigate('/create-task')}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Create New Task
            </button>
          )}
          <button
            onClick={() => logOut()}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                {hasAdminRole && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks?.map((task: any) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {task.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{task.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  {hasAdminRole && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/edit-task/${task.id}`)}
                          className="text-blue-600 hover:text-blue-900 px-3 py-1 rounded border border-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          disabled={loading}
                          className="text-red-600 hover:text-red-900 px-3 py-1 rounded border border-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          
          {tasks?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No tasks found. {hasAdminRole && 'Create your first task!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}