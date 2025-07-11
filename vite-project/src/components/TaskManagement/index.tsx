import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import LoginPage from "./pages/LoginPage";
import OurTasksPage from "./pages/OurTasksPage";
import MyTasksPage from "./pages/MyTasksPage";
import CreateTaskPage from "./pages/CreateTaskPage";
import UpdateTaskPage from "./pages/UpdateTaskPage";
import AccessDeniedPage from "./pages/AccessDeniedPage";
import AuthContext from "./context";
import type { User } from "./types";

export default function TasksManagementGuidelines() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="px-4 py-6 min-h-screen bg-blue-100">
          {/* Header riêng biệt với bóng đổ */}
          <div className="flex items-center -ml-4 -mr-4 -mt-6 pt-3 justify-between mb-8 bg-white shadow-lg px-2">
            <div className="flex flex-col gap-4">
            <strong className="text-2xl font-semibold text-blue-500">
              Tasks Management Guidelines
            </strong>
            {user && <p className="text-gray-600 mb-6">Hi, {user?.email}</p>}
            </div>
            
            <nav className="flex items-center gap-4">
              <NavLink
                to="/tasks"
                style={({ isActive }: { isActive: boolean }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                })}
                className={({ isActive }: { isActive: boolean }) =>
                  `px-3 py-1 rounded transition font-medium ${
                    isActive
                      ? "text-blue-700 underline"
                      : "text-gray-700 hover:text-blue-700"
                  }`
                }
              >
                Tasks
              </NavLink>
              <NavLink
                to="/assignee-me"
                style={({ isActive }: { isActive: boolean }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                })}
                className={({ isActive }: { isActive: boolean }) =>
                  `px-3 py-1 rounded transition font-medium ${
                    isActive
                      ? "text-blue-700 underline"
                      : "text-gray-700 hover:text-blue-700"
                  }`
                }
              >
                My Tasks
              </NavLink>
              <NavLink
                to="/create-task"
                style={({ isActive }: { isActive: boolean }) => ({
                  fontWeight: isActive ? "bold" : "normal",
                })}
                className={({ isActive }: { isActive: boolean }) =>
                  `px-3 py-1 rounded transition font-medium ${
                    isActive
                      ? "text-blue-700 underline"
                      : "text-gray-700 hover:text-blue-700"
                  }`
                }
              >
                Create Task
              </NavLink>
              {user && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-gray-700 hover:text-blue-800 transition"
                >
                  Logout
                </button>
              )}
            </nav>
            
          </div>
          
          {/* Body content giữ nguyên, KHÔNG dùng w-screen -ml-5 cho form */}
          <div className="max-w-6xl mx-auto p-6">
            <Routes>
              <Route index element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              {user && <Route path="/tasks" element={<OurTasksPage />} />}
              {user && <Route path="/assignee-me" element={<MyTasksPage />} />}
              {user && (
                <Route path="/create-task" element={<CreateTaskPage />} />
              )}
              {user && (
                <Route path="/update-task/:id" element={<UpdateTaskPage />} />
              )}
              <Route path="/*" element={<AccessDeniedPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}