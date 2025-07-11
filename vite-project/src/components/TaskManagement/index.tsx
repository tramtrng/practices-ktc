import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate } from 'react-router';
import LoginPage from './pages/LoginPage';
import OurTasksPage from './pages/OurTasksPage';
import MyTasksPage from './pages/MyTasksPage';
import CreateTaskPage from './pages/CreateTaskPage';
import UpdateTaskPage from './pages/UpdateTaskPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import AuthContext from './context';
import type { User } from './types';

const AppContent = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Tasks Management Guidelines</h1>
          <nav className="flex items-center gap-4">
            <NavLink
              to="/tasks"
              style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
              className={({ isActive }) =>
                `px-3 py-1 rounded transition font-medium ${
                  isActive ? 'text-blue-700 underline' : 'text-gray-700 hover:text-blue-700'
                }`
              }
            >
              Tasks
            </NavLink>
            <NavLink
              to="/assignee-me"
              style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
              className={({ isActive }) =>
                `px-3 py-1 rounded transition font-medium ${
                  isActive ? 'text-blue-700 underline' : 'text-gray-700 hover:text-blue-700'
                }`
              }
            >
              My Tasks
            </NavLink>
            <NavLink
              to="/create-task"
              style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}
              className={({ isActive }) =>
                `px-3 py-1 rounded transition font-medium ${
                  isActive ? 'text-blue-700 underline' : 'text-gray-700 hover:text-blue-700'
                }`
              }
            >
              Create Task
            </NavLink>
            {user && (
              <button
                onClick={handleLogout}
                className="ml- px-3 py-1 text-gray-700 hover:text-blue-800 transition"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
        {user && <p className="text-gray-600 mb-6">Hi, {user?.email}</p>}
        <div className="w-screen -ml-5 bg-white rounded-lg shadow-md">
          <Routes>
            <Route path="/" element={!user ? <LoginPage /> : <Navigate to="/tasks" />} />
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/tasks" />} />
            {user && <Route path="/tasks" element={<OurTasksPage />} />}
            {user && <Route path="/assignee-me" element={<MyTasksPage />} />}
            {user && <Route path="/create-task" element={<CreateTaskPage />} />}
            {user && <Route path="/update-task/:id" element={<UpdateTaskPage />} />}
            <Route path="/*" element={<AccessDeniedPage />} />
          </Routes>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default function TasksManagementGuidelines() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}