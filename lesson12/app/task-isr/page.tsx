import Link from "next/link";

export const revalidate = 60;

interface Task {
  id: number;
  userId?: number;
  title?: string;
  completed?: boolean;
  [key: string]: string | number | boolean | undefined;
}

export default async function TaskISRList() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const tasks: Task[] = await res.json();

  // Lấy danh sách id duy nhất
  const ids = Array.from(new Set(tasks.map((task: Task) => task.id)));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Task ID</h1>
      <div className="overflow-x-auto rounded-lg shadow max-w-lg mx-auto bg-white">
        <table className="min-w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 border">ID</th>
              <th className="py-3 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {ids.map(id => (
              <tr key={id} className="even:bg-blue-50">
                <td className="py-2 px-4 border text-center font-semibold">{id}</td>
                <td className="py-2 px-4 border text-center">
                  <Link
                    href={`/task-isr/${id}`}
                    className=" text-black px-4 py-1 rounded hover:text-blue-500 transition font-semibold"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}