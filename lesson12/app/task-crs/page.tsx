"use client";
import { useEffect, useState } from "react";

type Task = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function TaskCSR() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(setTasks);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center font-bold mb-6">Task CSR</h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 border">ID</th>
              <th className="py-3 px-4 border">Title</th>
              <th className="py-3 px-4 border">Completed</th>
              <th className="py-3 px-4 border">User ID</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} className="even:bg-blue-50">
                <td className="py-2 px-4 border">{task.id}</td>
                <td className="py-2 px-4 border">{task.title}</td>
                <td className="py-2 px-4 border text-center">
                  {task.completed ? "✅" : "❌"}
                </td>
                <td className="py-2 px-4 border">{task.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}