import React from 'react';

export default function AccessDeniedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white rounded-md shadow-2xl p-10 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-700 mb-2">Bạn không có quyền truy cập trang này.</p>
      </div>
    </div>
  );
}