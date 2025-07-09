import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

type Props = {
  selected: number | null;
  onSelect: (id: number | null) => void;
};

export default function FilterSidebar({ selected, onSelect }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);

        if (data.length > 0 && selected === null) {
          onSelect(data[0].id);
        }
      });
  }, []);

  return (
    <aside className="w-64 p-4 border-r">
      <h2 className="font-bold mb-2">Bộ lọc</h2>
      {categories.map((cat) => (
        <div key={cat.id}>
          <label>
            <input
              type="checkbox"
              checked={selected === cat.id}
              onChange={() => onSelect(selected === cat.id ? null : cat.id)}
            />
            {` ${cat.name}`}
          </label>
        </div>
      ))}
    </aside>
  );
}
