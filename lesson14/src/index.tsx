import { BrowserRouter, Route, Routes } from 'react-router';

import Login from './pages/Login';
import AccessDenied from './pages/AccessDenied';
import Tasks from './pages/Tasks';
import Customer from './pages/Customer';
import PrivateRoute from './components/PrivateRoute';

export default function TasksManagementWithZustand() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <BrowserRouter>
        <div className="container-fluid mx-auto">
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            {/* Thêm route access-denied */}
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route
              path="/tasks"
              element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
              }
            />
            <Route
              path="/customer"
              element={
                <PrivateRoute>
                  <Customer />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}