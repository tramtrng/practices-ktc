interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface PageProps {
  params: { id: string };
}

export const revalidate = 60;

export default async function TaskISR({ params }: PageProps) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
  if (!res.ok) {
    return (
      <div>
        <h1>Error {res.status}</h1>
        <p>Task not found</p>
      </div>
    );
  }
  const task: Task = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-3xl text-center font-bold mb-6 text-blue-700">Task ISR</h1>
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
            <tr className="even:bg-blue-50">
              <td className="py-2 px-4 border">{task.id}</td>
              <td className="py-2 px-4 border">{task.title}</td>
              <td className="py-2 px-4 border text-center">
                {task.completed ? "✅" : "❌"}
              </td>
              <td className="py-2 px-4 border">{task.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}