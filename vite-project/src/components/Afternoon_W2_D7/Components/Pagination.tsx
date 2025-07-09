type Props = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

export default function Pagination({ current, total, onChange }: Props) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-2 my-4">
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`px-3 py-1 border ${current === page ? 'bg-yellow-500 text-white' : ''}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}