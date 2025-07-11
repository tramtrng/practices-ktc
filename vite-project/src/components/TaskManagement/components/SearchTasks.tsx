import React from 'react';
type Props = {
  onSearch: (filters: { status?: string; priority?: string }) => void;
};

export default function SearchTasks({ onSearch }: Props) {
  const [status, setStatus] = React.useState('');
  const [priority, setPriority] = React.useState('');

  const handleSearch = () => {
    onSearch({ status, priority });
  };

  return (
    <div className="flex gap-4 w-full">
      <select
        value={status}
        onChange={e => setStatus(e.target.value)}
        className="border rounded px-3 py-2 flex-1"
      >
        <option value="">All status</option>
        <option value="to_do">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
        className="border rounded px-3 py-2 flex-1"
      >
        <option value="">All priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
}