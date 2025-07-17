import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuthStore } from '../useAuthStore';
import { apiClient } from '../libraries/api-client';

export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const { loggedInUser } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingTask, setLoadingTask] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    assigneeId: ''
  });

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
      return;
    }

    // Check if user has admin role
    const hasAdminRole = loggedInUser.roles.some((role) => role.name === 'Administrators');
    if (!hasAdminRole) {
      navigate('/access-denied');
      return;
    }

    // Load task data
    const fetchTask = async () => {
      try {
        const task = await apiClient.get(`/workspaces/tasks/${id}`);
        setFormData({
          title: task.data.title || '',
          description: task.data.description || '',
          status: task.data.status || 'pending',
          priority: task.data.priority || 'medium',
          assigneeId: task.data.assigneeId || ''
        });
      } catch (error) {
        console.error('Error fetching task:', error);
        alert('Failed to load task');
        navigate('/tasks');
      } finally {
        setLoadingTask(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [loggedInUser, navigate, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.put(`/workspaces/tasks/${id}`, formData);
      navigate('/tasks');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loadingTask) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading task...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Task #{id}</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="assigneeId" className="block text-sm font-medium text-gray-700 mb-1">
            Assignee ID
          </label>
          <input
            type="text"
            id="assigneeId"
            name="assigneeId"
            value={formData.assigneeId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter assignee ID"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Task'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/tasks')}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}